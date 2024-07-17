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
  },
  {
    label: 'Description détaillée',
    id: 'description',
    type: 'textarea',
    placeholder: 'les détails du produit',
  },
  {
    label: 'Prix HT par unité et par jour de location',
    id: 'priceHT',
    type: 'number',
    placeholder: '20€',
  },
  {
    label: 'Photo du produit',
    id: 'image',
    type: 'text',
    placeholder: 'Ajouter le lien vers la photo du produit',
  },
  {
    label: 'Type',
    id: 'subCategory',
    type: 'select',
    placeholder: 'Ajouter le lien vers la photo du produit',
  },
  {
    label: 'Quantité disponible',
    id: 'quantity',
    type: 'number',
    placeholder: '5',
  },
];
function UpdateProductRefModal({ isOpen, onClose, productRef }: ProductRefModalProps) {
  if (!isOpen || !productRef) return null;
  const [UpdateProductRef, { loading }] = useUpdateProductRefMutation();
  const { showAlert } = useAlert();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        showAlert('success', 'Produit modifié avec succès', 3000);

        onClose();
      } else {
        showAlert('error', 'Erreur lors de la modification du produit', 3000);
      }
    } catch (error) {
      showAlert('error', 'Erreur réseau ou de requête lors de l’ajout du produit', 3000);
      console.error('Erreur lors de la modification du produit', error);
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
  if (errorSubCategories) return <Loader />;

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
