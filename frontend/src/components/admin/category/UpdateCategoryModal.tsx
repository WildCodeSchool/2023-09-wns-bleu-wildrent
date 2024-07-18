import React from 'react';
import FormInput from '@/components/FormInput';
import { useUpdateCategoryMutation, AllCategoriesAdminQuery } from '@/graphql/generated/schema';
import client from '@/graphql/client';
import { useAlert } from '@/components/providers/AlertContext';

type Category = AllCategoriesAdminQuery['allCategories'][0];

const fields = [
  {
    label: 'Nom de la catégorie',
    id: 'name',
    type: 'text',
    placeholder: 'Entrez le nom de la catégorie',
    required: true,
  },
  {
    label: 'Description de la catégorie',
    id: 'description',
    type: 'textarea',
    placeholder: 'Entrez la description',
    required: true,
  },
  {
    label: 'Image de la catégorie',
    id: 'image',
    type: 'text',
    placeholder: "URL de l'image",
    required: true,
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
  const { showAlert } = useAlert();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const formData = new FormData(e.currentTarget);
    const formJSON = Object.fromEntries(formData.entries());

    try {
      const response = await updateCategory({
        variables: {
          id: category.id,
          name: formJSON.name.toString(),
          image: formJSON.image?.toString(),
          description: formJSON.description?.toString(),
        },
      });

      if (response.data?.updateCategory?.id) {
        showAlert('success', 'Category updated successfully', 3000);
        onCategoryUpdated(response.data.updateCategory);
        onClose();
      } else {
        showAlert('error', 'Error updating category', 3000);
      }
    } catch (error) {
      showAlert('error', 'Network or query error while updating category', 3000);
      console.error('Error updating category', error);
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
          <h3 className="text-lg font-bold">Edit an existing category</h3>
          <form className="flex flex-col gap-4 p-4 border rounded" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                inputType={field.type}
                defaultValue={category[field.id as keyof Category] as string}
                required={field.required}
              />
            ))}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Update
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="category_modal" onClick={onClose}>
          Close
        </label>
      </div>
    </div>
  );
}

export default UpdateCategoryModal;
