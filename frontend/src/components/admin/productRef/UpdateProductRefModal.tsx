import React from 'react';
import { ProductRefModalProps } from './ProductRefModalDetails';
import {
  UpdateProductRef,
  useUpdateProductRefMutation,
  useAllSubCategoriesQuery,
} from '@/graphql/generated/schema';
import FormInput from '@/components/FormInput';
import client from '@/graphql/client';
import { ProductRef, SimpleSubCategory } from '@/types';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/hooks/AlertContext';
const fields = [
  {
    label: 'Product Name',
    id: 'name',
    type: 'text',
    placeholder: 'Chair Adèle',
    required: true,
  },
  {
    label: 'Description',
    id: 'description',
    type: 'textarea',
    placeholder: 'Product details',
    required: true,
  },
  {
    label: 'Price HT per unit & per day',
    id: 'priceHT',
    type: 'number',
    placeholder: '20€',
    required: true,
  },
  {
    label: 'Product image',
    id: 'image',
    type: 'text',
    placeholder: 'Link to the product image',
    required: true,
  },
  {
    label: 'Type',
    id: 'subCategory',
    type: 'select',
    placeholder: 'Select a subcategory',
    required: true,
  },
  {
    label: 'Quantité disponible',
    id: 'quantityAvailable',
    type: 'number',
    placeholder: '5',
    required: true,
  },
];
function UpdateProductRefModal({
  isOpen,
  onClose,
  productRef,
}: ProductRefModalProps): React.ReactNode {
  if (!isOpen || !productRef) return null;
  const [UpdateProductRef, { loading }] = useUpdateProductRefMutation();
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
      const response = await UpdateProductRef({
        variables: {
          productRefId: productRef.id,
          data: formJSON as UpdateProductRef,
        },
      });
      if (response.data && response.data.updateProductRef.success) {
        showAlert('success', 'Product modified successfully', 3000);

        onClose();
      } else {
        showAlert('error', 'Error editing product', 3000);
      }
    } catch (error) {
      showAlert('error', 'Network or query error while editing product', 3000);
      console.error('Error while editing product', error);
    } finally {
      client.resetStore();
    }
  };
  const {
    data: subCategoriesData,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = useAllSubCategoriesQuery();

  if (loadingSubCategories) return <Loader />;
  if (errorSubCategories) {
    showAlert('error', errorSubCategories?.message, 3000);
  }
  // Trouver l'ID de la sous-catégorie à partir de son nom
  const subCategoryId = subCategoriesData?.allSubCategories.find(
    (subCategory: SimpleSubCategory) => subCategory.name === productRef?.subCategory?.name,
  )?.id;
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
          <h3 className="text-lg font-bold">Editing product</h3>
          <form className="flex flex-col gap-4 border rounded p-4" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                inputType={field.type}
                defaultValue={
                  field.id === 'subCategory'
                    ? String(subCategoryId)
                    : (productRef[field.id as keyof ProductRef] as string)
                }
                options={
                  field.id === 'subCategory'
                    ? subCategoriesData?.allSubCategories.map((subCategory: SimpleSubCategory) => ({
                        value: subCategory.id,
                        label: subCategory.name,
                      }))
                    : undefined
                }
                required={field.required}
              />
            ))}
            <button disabled={loading} className="btn btn-active btn-secondary" type="submit">
              Save
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

export default UpdateProductRefModal;
