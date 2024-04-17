// components/admin/CategoryEditModal.tsx
import React, { useState } from 'react';
import { Category } from '../../graphql/generated/schema';

type Props = {
  category: Category;
  onSave: (category: Category) => void;
  onClose: () => void;
};

const CategoryEditModal: React.FC<Props> = ({ category, onSave, onClose }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(category.image);

  const handleSave = () => {
    onSave({ ...category, name, description, image });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg text-center mb-4">Modifier la Catégorie</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="mb-2 px-2 py-1 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mb-2 px-2 py-1 w-full"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="mb-2 px-2 py-1 w-full"
        />
        <div className="text-center">
          <button
            onClick={() => onSave({ ...category, name, description, image })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
          >
            Sauvegarder
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
