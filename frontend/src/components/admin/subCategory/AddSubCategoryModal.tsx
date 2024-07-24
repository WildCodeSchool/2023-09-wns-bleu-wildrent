import React, { useEffect, useState } from 'react';
import FormInput from '@/components/FormInput';
import { useAddSubCategoryMutation, useAllCategoriesQuery } from '@/graphql/generated/schema';
import client from '@/graphql/client';
import { useAlert } from '@/components/hooks/AlertContext';
import Loader from '@/components/Loader';

const fields = [
  {
    label: 'Nom de la sous-catégorie',
    id: 'name',
    type: 'text',
    placeholder: 'Entrez le nom de la sous-catégorie',
    required: true,
  },
  {
    label: 'Description de la sous-catégorie',
    id: 'description',
    type: 'textarea',
    placeholder: 'Entrez la description',
    required: true,
  },
  {
    label: 'Image de la sous-catégorie',
    id: 'image',
    type: 'text',
    placeholder: "URL de l'image",
    required: true,
  },
  {
    label: 'Catégorie',
    id: 'category',
    type: 'select',
    required: true,
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
  const { showAlert } = useAlert();
  useEffect(() => {
    if (categoryData && categoryData.allCategories) {
      setCategories(categoryData.allCategories);
    }
  }, [categoryData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const formData = new FormData(e.currentTarget);
    const formJSON: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formJSON[key] = value instanceof File ? value.name : value;
    });
    const categoryId = formJSON.category;
    if (!categoryId) {
      showAlert('error', 'Catégorie invalide.', 3000);
      return;
    }

    try {
      const response = await addSubCategory({
        variables: {
          name: formJSON.name.toString(),
          description: formJSON.description ? formJSON.description.toString() : null,
          image: formJSON.image.toString(),
          categoryId: parseInt(formJSON.category, 10),
        },
      });

      if (response.data && response.data.addSubCategory) {
        showAlert('success', 'Subcategory added successfully', 3000);
        onSubCategoryAdded(response.data.addSubCategory);
        onClose();
        // Refetch categories after adding a subcategory
        await refetchCategories();
      } else {
        showAlert('error', 'Error adding subcategory', 3000);
      }
    } catch (error) {
      showAlert('error', 'Network or query error while adding subcategory', 3000);
      console.error('Error adding subcategory', error);
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
            <Loader />
          ) : (
            <form className="flex flex-col gap-4 p-4 border rounded" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <FormInput
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  inputType={field.type}
                  options={
                    categories
                      ? categories.map((category) => ({
                          value: category.id,
                          label: category.name,
                        }))
                      : undefined
                  }
                  required={field.required}
                />
              ))}
              {/* <div className="form-group">
                <label htmlFor="categoryId">Catégorie</label>
                <select id="categoryId" name="categoryId" className="form-control">
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={addLoading || categoryLoading}
              >
                {addLoading || categoryLoading ? <Loader /> : 'Add'}
              </button>
            </form>
          )}
        </div>
        S
        <label className="modal-backdrop" htmlFor="subcategory_modal" onClick={onClose}>
          Fermer
        </label>
      </div>
    </div>
  );
}

export default AddSubCategoryModal;
