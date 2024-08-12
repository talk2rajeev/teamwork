import react, { useState } from 'react';
import {
  ActionType,
  Product,
  SelectedProduct,
} from '../../../utils/types/types';
import { ImSpinner5 } from 'react-icons/im';
import { getProductWithTeam } from '../../../utils/helperFunctions/product/productHelper';

type ViewProductProps = {
  selectedProduct?: SelectedProduct;
  product?: Product;
};

const ViewProduct: React.FC<ViewProductProps> = ({
  selectedProduct,
  product,
}) => {
  // assign team
  // assign prod owner

  const productWithTeam = getProductWithTeam(selectedProduct, product);

  if (selectedProduct?.status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-72">
        <ImSpinner5 size={36} fill="#0099ff" className="rotating-image" />
      </div>
    );
  }

  return (
    <div className="user-story-container bg-white p-2">
      <div>
        <div>Product Name: {productWithTeam?.productName}</div>
        <div>Product Owner: {productWithTeam?.productOwnerName}</div>
        <div>Product Team: {productWithTeam?.productTeam}</div>
      </div>
    </div>
  );
};

export default ViewProduct;
