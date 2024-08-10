import { Product, SelectedProduct } from '../../types/types';

export const getProductWithTeam = (
  selectedProduct?: SelectedProduct,
  product?: Product
) => {
  return {
    productName:
      product?.productName || selectedProduct?.product[0].productName,
    productOwnerName:
      product?.product_owner_fname + ' ' + product?.product_owner_lname ||
      selectedProduct?.product[0]?.productOwner.owner_fname +
        ' ' +
        selectedProduct?.product[0]?.productOwner.owner_lname,
    productTeam: selectedProduct?.product[0]?.team?.teamName,
  };
};
