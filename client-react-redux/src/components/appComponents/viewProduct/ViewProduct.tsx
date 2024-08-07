import react, { useState } from 'react';
import { ActionType, SelectedProduct } from '../../../utils/types/types';
import { ImSpinner5 } from 'react-icons/im';

type ViewProductProps = {
  selectedProduct?: SelectedProduct;
};

const ViewProduct: React.FC<ViewProductProps> = ({ selectedProduct }) => {
  // assign team
  // assign prod owner

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
        <div>Product Name: {selectedProduct?.product[0]?.productName}</div>
        <div>
          Product Owner:{' '}
          {selectedProduct?.product[0]?.productOwner.owner_fname +
            ' ' +
            selectedProduct?.product[0]?.productOwner.owner_lname}
        </div>
        <div>Product Team: {selectedProduct?.product[0]?.team.teamName}</div>
      </div>
    </div>
  );
};

export default ViewProduct;
