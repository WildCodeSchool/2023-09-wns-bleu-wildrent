import { SimpleSubCategory } from '@/types';
import React, { useState } from 'react';
import { ProductRefModalProps } from './ProductRefModalDetails';
import {
  InputProductRef,
  useAddProductRefMutation,
  useAllSubCategoriesQuery,
} from '@/graphql/generated/schema';
import FormInput from '@/components/FormInput';
import client from '@/graphql/client';
import { useAlert } from '@/components/hooks/AlertContext';
import Loader from '@/components/Loader';

const fields = [
  {
    id: 'name',
    label: 'Product Name',
    type: 'text',
    placeholder: 'Enter product name',
    required: true,
  },
  {
    id: 'description',
    label: 'Product Description',
    type: 'textarea',
    placeholder: 'Enter product description',
    required: true,
  },
  {
    label: 'HT Price per unit & per day',
    id: 'priceHT',
    type: 'number',
    placeholder: '20€',
    required: true,
  },
  {
    label: 'Product image',
    id: 'image',
    type: 'text',
    placeholder: 'Add the product image URL',
    required: true,
  },
  {
    label: 'Type',
    id: 'subCategory',
    type: 'select',
    required: true,
  },
  {
    label: 'Available quantity',
    id: 'quantity',
    type: 'number',
    placeholder: '5',
    required: true,
  },
];

function AddProductRefModal({ isOpen, onClose }: ProductRefModalProps) {
  if (!isOpen) return null;
  const [createProduct, { data, loading }] = useAddProductRefMutation();
  const {
    data: subCategoriesData,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = useAllSubCategoriesQuery();
  const { showAlert } = useAlert();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.priceHT = parseFloat(formJSON.priceHT);
    formJSON.subCategory = { id: parseInt(formJSON.subCategory) };
    formJSON.quantity = parseInt(formJSON.quantity);
    try {
      const response = await createProduct({
        variables: {
          data: formJSON as InputProductRef,
        },
      });
      if (response.data && response.data.addProductRef.success) {
        showAlert('success', 'Product added successfully', 3000);
        onClose();
      } else {
        showAlert('error', 'Error adding product', 3000);
      }
    } catch (error) {
      showAlert('error', 'Network or query error while adding product', 3000);
      console.error('Error adding product', error);
    } finally {
      client.resetStore();
    }
  };

  if (loadingSubCategories) return <Loader />;
  if (errorSubCategories) {
    showAlert('error', errorSubCategories?.message, 3000);
  }

  return (
    <div>
      <input
        type="checkbox"
        id="product_modal"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Adding a new product</h3>
          <form className="flex flex-col gap-4 border rounded p-4" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                inputType={field.type}
                options={
                  subCategoriesData?.allSubCategories
                    ? subCategoriesData.allSubCategories.map((subCategory: SimpleSubCategory) => ({
                        value: subCategory.id,
                        label: subCategory.name,
                      }))
                    : undefined
                }
                required={field.required}
              />
            ))}
            <button disabled={loading} className="btn btn-active btn-secondary" type="submit">
              Add
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="product_modal" onClick={onClose}>
          Close
        </label>
      </div>
    </div>
  );
}

export default AddProductRefModal;
