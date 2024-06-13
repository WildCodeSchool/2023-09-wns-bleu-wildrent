import React, { useEffect, useState } from 'react';
import FormInput from '@/components/FormInput';
import {
  useUpdateSubCategoryMutation,
  useAllCategoriesQuery,
  AllSubCategoriesQuery,
} from '@/graphql/generated/schema';
import client from '@/graphql/client';
import { Category, SubCategory } from '@/types';

interface UpdateSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subCategory: SubCategory | null;
  onSubCategoryUpdated: (subCategory: SubCategory) => void;
}

const fields = [
  // Définition des champs du formulaire
  {
    label: 'Nom de la sous-catégorie',
    id: 'name',
    type: 'text',
    placeholder: 'Entrez le nom de la sous-catégorie',
  },
  {
    label: 'Description de la sous-catégorie',
    id: 'description',
    type: 'textarea',
    placeholder: 'Entrez la description',
  },
  {
    label: 'Image de la sous-catégorie',
    id: 'image',
    type: 'text',
    placeholder: "URL de l'image",
  },
];

function UpdateSubCategoryModal({
  isOpen,
  onClose,
  subCategory,
  onSubCategoryUpdated,
}: UpdateSubCategoryModalProps) {
  // Utilisation des requêtes GraphQL pour charger les données nécessaires
  const { data: categoriesData, loading: categoriesLoading } = useAllCategoriesQuery();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(() =>
    subCategory && subCategory.category ? subCategory.category.id : undefined,
  );
  const [updateSubCategory, { loading }] = useUpdateSubCategoryMutation();

  useEffect(() => {
    // Mise à jour des catégories lorsque les données sont chargées
    if (categoriesData && categoriesData.allCategories) {
      setCategories(
        categoriesData.allCategories.map((category) => ({
          id: category.id,
          name: category.name,
          image: category.image || '',
        })),
      );
    }
  }, [categoriesData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subCategory) {
      alert('La sous-catégorie est introuvable.');
      return;
    }

    // Extraction des données du formulaire
    const formData = new FormData(e.currentTarget);
    const formJSON = Object.fromEntries(formData.entries());
    const categoryId =
      selectedCategoryId || categories.find((c) => c.name === formJSON.categoryId)?.id;

    if (!categoryId) {
      alert('Veuillez sélectionner une catégorie valide.');
      return;
    }

    // Préparation des variables pour la mutation GraphQL
    const variables = {
      id: subCategory.id,
      name: formJSON.name.toString(),
      description: formJSON.description?.toString(),
      image: formJSON.image?.toString(),
      categoryId: categoryId,
    };

    try {
      // Tentative de mise à jour de la sous-catégorie via GraphQL
      const response = await updateSubCategory({ variables });
      if (response.data?.updateSubCategory) {
        alert('Sous-catégorie mise à jour avec succès');
        onSubCategoryUpdated(response.data.updateSubCategory);
        onClose();
      }
    } catch (error) {
      alert('Erreur réseau ou de requête lors de la mise à jour de la sous-catégorie');
      console.error('Erreur lors de la mise à jour de la sous-catégorie', error);
    }
  };

  if (!isOpen || !subCategory) return null;

  return (
    // Modal pour la mise à jour de sous-catégorie
    <div>
      <input
        type="checkbox"
        id="subcategory_modal"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit an existing subcategory</h3>
          <form className="flex flex-col gap-4 p-4 border rounded" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                inputType={field.type}
                defaultValue={subCategory[field.id as keyof SubCategory] as string}
              />
            ))}
            <div className="form-group">
              <label htmlFor="categoryId">Catégorie</label>
              <select
                id="categoryId"
                name="categoryId"
                value={selectedCategoryId || ''}
                onChange={(e) => setSelectedCategoryId(Number(e.target.value) || undefined)}
                className="form-control"
              >
                <option value="">-- Select a category --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || categoriesLoading}
            >
              Mettre à jour
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="subcategory_modal" onClick={onClose}>
          Fermer
        </label>
      </div>
    </div>
  );
}

export default UpdateSubCategoryModal;
