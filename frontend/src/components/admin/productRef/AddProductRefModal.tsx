import { ProductRef, SimpleSubCategory } from '@/types';
import React from 'react';
import { ProductRefModalProps } from './ProductRefModalDetails';
import {
  InputProductRef,
  useAddProductRefMutation,
  useAllSubCategoriesQuery,
  SubCategory,
} from '@/graphql/generated/schema';
import FormInput from '@/components/FormInput';
import client from '@/graphql/client';

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
    id: 'subCategoryId',
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

function AddProductRefModal({ isOpen, onClose }: ProductRefModalProps) {
  if (!isOpen) return null;
  const [createProduct, { data, loading, error }] = useAddProductRefMutation();
  const {
    data: subCategoriesData,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = useAllSubCategoriesQuery();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.priceHT = parseFloat(formJSON.priceHT);
    formJSON.subCategoryId = parseInt(formJSON.subCategoryId);
    formJSON.quantity = parseInt(formJSON.quantity);
    try {
      const response = await createProduct({
        variables: {
          data: formJSON as InputProductRef,
        },
      });
      console.log(response.data);
      if (response.data && response.data.addProductRef.success) {
        alert('Produit ajouté avec succès');
        onClose();
      } else {
        alert(`Erreur lors de l'ajout du produit`);
      }
    } catch (error) {
      alert('Erreur réseau ou de requête lors de l’ajout du produit');
      console.error('Erreur lors de l’ajout du produit', error);
    } finally {
      client.resetStore();
    }
  };

  if (loadingSubCategories) return <p>Chargement des sous-catégories...</p>;
  if (errorSubCategories) return <p>Erreur lors du chargement des sous-catégories.</p>;

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
          <h3 className="text-lg font-bold">Ajout d'un nouveau produit</h3>
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
              />
            ))}
            <button disabled={loading} className="btn btn-active btn-secondary" type="submit">
              Ajouter
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
