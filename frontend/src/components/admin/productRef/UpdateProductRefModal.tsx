import React from 'react';
import { ProductRefModalProps } from './ProductRefModalDetails';
import {
  UpdateProductRef,
  useUpdateProductRefMutation,
  useAllSubCategoriesQuery,
  SubCategory,
  useProductRefByIdQuery,
} from '@/graphql/generated/schema';
import FormInput from '@/components/FormInput';
import client from '@/graphql/client';
import { ProductRef, SimpleSubCategory } from '@/types';
import Loader from '@/components/Loader';
import { useAlert } from '@/components/providers/AlertContext';
const fields = [
  {
    label: 'Nom du produit',
    id: 'name',
    type: 'text',
    placeholder: 'Chaise Adèle',
    required: true,
  },
  {
    label: 'Description détaillée',
    id: 'description',
    type: 'textarea',
    placeholder: 'les détails du produit',
    required: true,
  },
  {
    label: 'Prix HT par unité et par jour de location',
    id: 'priceHT',
    type: 'number',
    placeholder: '20€',
    required: true,
  },
  {
    label: 'Photo du produit',
    id: 'image',
    type: 'text',
    placeholder: 'Ajouter le lien vers la photo du produit',
    required: true,
  },
  {
    label: 'Type',
    id: 'subCategory',
    type: 'select',
    placeholder: 'Ajouter le lien vers la photo du produit',
    required: true,
  },
  {
    label: 'Quantité disponible',
    id: 'quantity',
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
          <h3 className="text-lg font-bold">Modification d'un produit</h3>
          <form className="flex flex-col gap-4 border rounded p-4" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                inputType={field.type}
                defaultValue={productRef[field.id as keyof ProductRef] as string}
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
