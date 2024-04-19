import { ProductRef } from '@/types';
import React from 'react';
export type ProductRefModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductRef;
};

function ProductRefModalDetails({ isOpen, onClose, product }: ProductRefModalProps) {
  if (!isOpen) return null;

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
          <h3 className="text-lg font-bold">{product?.name}</h3>
          <p className="py-4">{product?.description}</p>
          <p className="text-lg">Price: {product?.priceHT}€ HT</p>
        </div>
        <label className="modal-backdrop" htmlFor="product_modal" onClick={onClose}>
          Close
        </label>
      </div>
    </div>
  );
}

export default ProductRefModalDetails;
