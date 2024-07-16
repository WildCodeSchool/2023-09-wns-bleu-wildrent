import React, { useEffect, useState } from 'react';
import FormInput from '@/components/FormInput';
import { useAddSubCategoryMutation, useAllCategoriesQuery } from '@/graphql/generated/schema';
import client from '@/graphql/client';

const fields = [
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

type Category = {
  id: number;
  name: string;
  description?: string | null;
  image?: string;
};

function AddSubCategoryModal({
  isOpen,
  onClose,
  onSubCategoryAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubCategoryAdded: (subCategory: any) => void;
}) {
  const [addSubCategory, { loading: addLoading }] = useAddSubCategoryMutation();
  const {
    data: categoryData,
    loading: categoryLoading,
    refetch: refetchCategories,
  } = useAllCategoriesQuery();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categoryData && categoryData.allCategories) {
      setCategories(categoryData.allCategories);
    }
  }, [categoryData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJSON = Object.fromEntries(formData.entries());
    const selectedCategoryName = formJSON.categoryId.toString();
    const categoryId = categories.find((c) => c.name === selectedCategoryName)?.id;

    if (!categoryId) {
      alert('Catégorie invalide.');
      return;
    }

    try {
      const response = await addSubCategory({
        variables: {
          name: formJSON.name.toString(),
          description: formJSON.description ? formJSON.description.toString() : null,
          image: formJSON.image.toString(),
          categoryId,
        },
      });

      if (response.data && response.data.addSubCategory) {
        alert('Sous-catégorie ajoutée avec succès');
        onSubCategoryAdded(response.data.addSubCategory);
        onClose();
        // Refetch categories after adding a subcategory
        await refetchCategories();
      } else {
        alert('Erreur lors de l’ajout de la sous-catégorie');
      }
    } catch (error) {
      alert('Erreur réseau ou de requête lors de l’ajout de la sous-catégorie');
      console.error('Erreur lors de l’ajout de la sous-catégorie', error);
    } finally {
      client.resetStore();
    }
  };

  if (!isOpen) return null;

  return (
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
          <h3 className="text-lg font-bold">Ajout d'une nouvelle sous-catégorie</h3>
          {categoryLoading ? (
            <div>Chargement des catégories...</div>
          ) : (
            <form className="flex flex-col gap-4 p-4 border rounded" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <FormInput
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  inputType={field.type}
                />
              ))}
              <div className="form-group">
                <label htmlFor="categoryId">Catégorie</label>
                <select id="categoryId" name="categoryId" className="form-control">
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={addLoading || categoryLoading}
              >
                {addLoading || categoryLoading ? 'Chargement...' : 'Ajouter'}
              </button>
            </form>
          )}
        </div>
        <label className="modal-backdrop" htmlFor="subcategory_modal" onClick={onClose}>
          Fermer
        </label>
      </div>
    </div>
  );
}

export default AddSubCategoryModal;
