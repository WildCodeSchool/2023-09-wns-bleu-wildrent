import React from 'react';
import FormInput from '@/components/FormInput';
import { useUpdateCategoryMutation, AllCategoriesAdminQuery } from '@/graphql/generated/schema';
import client from '@/graphql/client';

type Category = AllCategoriesAdminQuery['allCategories'][0];

const fields = [
  {
    label: 'Nom de la catégorie',
    id: 'name',
    type: 'text',
    placeholder: 'Entrez le nom de la catégorie',
  },
  {
    label: 'Description de la catégorie',
    id: 'description',
    type: 'textarea',
    placeholder: 'Entrez la description',
  },
  {
    label: 'Image de la catégorie',
    id: 'image',
    type: 'text',
    placeholder: "URL de l'image",
  },
];

function UpdateCategoryModal({
  isOpen,
  onClose,
  category,
  onCategoryUpdated,
}: {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onCategoryUpdated: (category: Category) => void;
}) {
  if (!isOpen || !category) return null;
  const [updateCategory, { loading, error }] = useUpdateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formJSON = Object.fromEntries(formData.entries());

    try {
      const response = await updateCategory({
        variables: {
          id: category.id,
          name: formJSON.name.toString(),
          image: formJSON.image.toString(),
          description: formJSON.description.toString(),
        },
      });

      if (response.data?.updateCategory?.id) {
        alert('Catégorie mise à jour avec succès');
        onCategoryUpdated(response.data.updateCategory); // Utilisez la fonction ici
        onClose();
      } else {
        alert('Erreur lors de la mise à jour de la catégorie');
      }
    } catch (error) {
      alert('Erreur réseau ou de requête lors de la mise à jour de la catégorie');
      console.error('Erreur lors de la mise à jour de la catégorie', error);
    } finally {
      client.resetStore();
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="category_modal"
        className="modal-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Modifier une catégorie existante</h3>
          <form className="flex flex-col gap-4 p-4 border rounded" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                inputType={field.type}
                defaultValue={category[field.id as keyof Category] as string}
              />
            ))}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Mettre à jour
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="category_modal" onClick={onClose}>
          Fermer
        </label>
      </div>
    </div>
  );
}

export default UpdateCategoryModal;
