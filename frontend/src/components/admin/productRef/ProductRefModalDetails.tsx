import { ProductRef } from '@/types';
import React from 'react';
export type ProductRefModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productRef?: ProductRef;
};

function ProductRefModalDetails({ isOpen, onClose, productRef }: ProductRefModalProps) {
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
          <h3 className="text-lg font-bold">{productRef?.name}</h3>
          <p className="py-4">{productRef?.description}</p>
          <p className="text-lg">Price: {productRef?.priceHT}€ HT</p>
        </div>
        <label className="modal-backdrop" htmlFor="product_modal" onClick={onClose}>
          Close
        </label>
      </div>
    </div>
  );
}

export default ProductRefModalDetails;
