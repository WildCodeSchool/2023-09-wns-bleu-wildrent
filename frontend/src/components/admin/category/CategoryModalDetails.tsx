import React from 'react';

export type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: {
    name: string;
    description: string;
    image: string;
  };
};

function CategoryDetailsModal({ isOpen, onClose, category }: CategoryModalProps) {
  if (!isOpen) return null;

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
          <h3 className="text-lg font-bold">{category?.name}</h3>
          <p className="py-4">{category?.description}</p>
          <img src={category?.image} alt="Image de la catégorie" />
        </div>
        <label className="modal-backdrop" htmlFor="category_modal" onClick={onClose}>
          Fermer
        </label>
      </div>
    </div>
  );
}

export default CategoryDetailsModal;
