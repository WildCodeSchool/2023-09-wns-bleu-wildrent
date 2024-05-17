import { ProductRef, SimpleSubCategory } from '@/types';
import React from 'react';
import { ProductRefModalProps } from '../ProductRefModalDetails';
import {
  UpdateProductRef,
  useUpdateProductRefMutation,
  useAllSubCategoriesQuery,
  SubCategory,
  useProductRefByIdQuery,
} from '@/graphql/generated/schema';
import FormInput from '@/components/FormInput';
import client from '@/graphql/client';
import { useRouter } from 'next/router';

function UpdateProductRefModal({ isOpen, onClose }: ProductRefModalProps) {
  const router = useRouter();

  const { productRefId } = router.query;
  console.log('productRefId', productRefId);

  const { data: dataProd } = useProductRefByIdQuery({
    variables: { productRefId: typeof productRefId === 'string' ? parseInt(productRefId, 10) : 0 },
    skip: !router.isReady,
  });
  const fields = dataProd?.productRefById;
  console.log(dataProd);

  if (!isOpen) return null;
  const [UpdateProductRef, { data, loading, error }] = useUpdateProductRefMutation();
  const {
    data: subCategoriesData,
    loading: loadingSubCategories,
    error: errorSubCategories,
  } = useAllSubCategoriesQuery();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.priceHT = parseFloat(formJSON.priceHT);
    formJSON.subCategoryId = parseInt(formJSON.subCategoryId);
    formJSON.quantity = parseInt(formJSON.quantity);
    try {
      const id = parseInt(formJSON.id);
      const response = await UpdateProductRef({
        variables: {
          productRefId: id,
          data: formJSON as UpdateProductRef,
        },
      });
      console.log(response.data);
      if (response.data && response.data.updateProductRef.success) {
        alert('Produit modifié avec succès');
        onClose();
      } else {
        alert(`Erreur lors de la modification du produit`);
      }
    } catch (error) {
      alert('Erreur réseau ou de requête lors de l’ajout du produit');
      console.error('Erreur lors de la modification du produit', error);
    } finally {
      client.resetStore();
    }
  };

  if (loadingSubCategories) return <p>Chargement des sous-catégories...</p>;
  if (errorSubCategories) return <p>Erreur lors du chargement des sous-catégories.</p>;

  return;
  // (
  // <div>
  //   <input
  //     type="checkbox"
  //     id="product_modal"
  //     className="modal-toggle"
  //     checked={isOpen}
  //     readOnly
  //   />
  //   <div className="modal" role="dialog">
  //     <div className="modal-box">
  //       <h3 className="text-lg font-bold">Modification d'un produit</h3>
  //       <form className="flex flex-col gap-4 border rounded p-4" onSubmit={handleSubmit}>
  //         {fields.map((field) => (
  //           <FormInput
  //             key={field.id}
  //             id={field.id}
  //             label={field.label}
  //             placeholder={field.placeholder}
  //             inputType={field.type}
  //             options={
  //               subCategoriesData?.allSubCategories
  //                 ? subCategoriesData.allSubCategories.map((subCategory: SimpleSubCategory) => ({
  //                     value: subCategory.id,
  //                     label: subCategory.name,
  //                   }))
  //                 : undefined
  //             }
  //           />
  //         ))}
  //         <button disabled={loading} className="btn btn-active btn-secondary" type="submit">
  //           Modifier
  //         </button>
  //       </form>
  //     </div>
  //     <label className="modal-backdrop" htmlFor="product_modal" onClick={onClose}>
  //       Close
  //     </label>
  //   </div>
  // </div>
  // );
}

export default UpdateProductRefModal;
