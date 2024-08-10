import react, { useState } from 'react';
import { ImSpinner5 } from 'react-icons/im';
import * as coreComponents from '../../core-components';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import {
  ActionType,
  SelectedProduct,
  Product,
} from '../../../utils/types/types';
import { getProductWithTeam } from '../../../utils/helperFunctions/product/productHelper';
import { teamMap } from '../../../slices/team/teamSlice';

type UpdateProductProps = {
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: ActionType;
  selectedProduct?: SelectedProduct;
  product?: Product;
};

const UpdateProduct: React.FC<UpdateProductProps> = ({
  inputChange,
  type,
  selectedProduct,
  product,
}) => {
  // Featch team list & create a listOption out of it for team combobox
  // Fetch UserProfileList & create a listOption out of it for productOwner combobox

  const productListObj = useAppSelector(teamMap);
  const productWithTeam = getProductWithTeam(selectedProduct, product);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data?: any
  ) => {
    console.log(event.target.name, event.target.value);
    inputChange(event);
  };

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
        <div className="p-2">
          <coreComponents.Input
            label="Product Name"
            type="text"
            name="productName"
            placeholder="Product Name"
            onchange={onInputChange}
            value={productWithTeam.productName}
            classes="text-base bg-white border-1 border-slate-300 outline-slate-400"
          />
        </div>
        <div className="p-2">
          <coreComponents.SearchableCombobox
            items={[
              'Sprint.1a',
              'Sprint.1b',
              'Sprint.2a',
              'Sprint.2b',
              'Sprint.3a',
              'Sprint.3b',
            ]}
            onSelect={(item: string) => {
              console.log(item);
            }}
            label="Select Team"
          />
        </div>
        <div className="p-2">
          <coreComponents.SearchableCombobox
            items={[
              'Sprint.1a',
              'Sprint.1b',
              'Sprint.2a',
              'Sprint.2b',
              'Sprint.3a',
              'Sprint.3b',
            ]}
            onSelect={(item: string) => {
              console.log(item);
            }}
            label="Product Owner"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
