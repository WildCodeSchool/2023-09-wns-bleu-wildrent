import React from 'react';
import FormInput from '@/components/FormInput';
import { useAddCategoryMutation } from '@/graphql/generated/schema';
import client from '@/graphql/client';
import { useAlert } from '@/components/providers/AlertContext';

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

function AddCategoryModal({
  isOpen,
  onClose,
  onCategoryAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: any) => void;
}) {
  if (!isOpen) return null;
  const [createCategory, { loading }] = useAddCategoryMutation();
  const { showAlert } = useAlert();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJSON = Object.fromEntries(formData.entries());

    try {
      const response = await createCategory({
        variables: {
          name: formJSON.name.toString(),
          image: formJSON.image.toString(),
          description: formJSON.description.toString(),
        },
      });
      if (response.data?.addCategory) {
        showAlert('success', 'Catégorie ajoutée avec succès', 3000);
        onCategoryAdded(response.data.addCategory);
        onClose();
      } else {
        showAlert('error', 'Erreur lors de l’ajout de la catégorie', 3000);
      }
    } catch (error) {
      showAlert('error', 'Erreur réseau ou de requête lors de l’ajout de la catégorie', 3000);
      console.error('Erreur lors de l’ajout de la catégorie', error);
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
          <h3 className="text-lg font-bold">Ajout d'une nouvelle catégorie</h3>
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Add
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

export default AddCategoryModal;
