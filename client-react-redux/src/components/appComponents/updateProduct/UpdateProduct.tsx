import react, { useState, useEffect } from 'react';
import { ImSpinner5 } from 'react-icons/im';
import * as coreComponents from '../../core-components';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import * as Types from '../../../utils/types/types';
import { getProductWithTeam } from '../../../utils/helperFunctions/product/productHelper';
import { teamWithUsers } from '../../../slices/team/teamSlice';
import { allUsers } from '../../../slices/users/userSlice';
import { useDebounce } from '../../../hooks/debounce/debounce';
import {
  setProductId,
  setProductName,
  setProductTeamId,
  setProductOwnerId,
  selectedProductId,
  updateProductFormData,
} from '../../../slices/product/productSlice';
import { GiConfirmed } from 'react-icons/gi';
import { MdError } from 'react-icons/md';

type UpdateProductProps = {
  type: Types.ActionType;
  selectedProduct?: Types.SelectedProduct;
  product?: Types.Product;
};

const UpdateProduct: React.FC<UpdateProductProps> = ({
  type,
  selectedProduct,
  product,
}) => {
  // on update success:: handle it better UX way
  // on update failure : handle error

  const dispatch = useAppDispatch();
  const teams = useAppSelector(teamWithUsers);
  const users = useAppSelector(allUsers);
  const productId = useAppSelector(selectedProductId);
  const formData = useAppSelector(updateProductFormData);
  const productWithTeam = getProductWithTeam(selectedProduct, product);
  const userList = users.users.map((u) => `${u.fname} ${u.lname}`);
  const [prodName, setProdName] = useState<string>('');

  const disabled = type === 'view';

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data?: any
  ) => {
    setProdName(event.target.value);
  };

  const debouncedProductName = useDebounce(prodName, 500);

  useEffect(() => {
    if (debouncedProductName) {
      dispatch(setProductName(debouncedProductName));
    }
  }, [debouncedProductName]);

  useEffect(() => {
    if (productId) {
      dispatch(setProductId(productId));
    }
  }, [productId]);

  const onTeamSelect = (item: string) => {
    const team_id = teams.find((t) => t.team_name === item)?.team_id;
    if (team_id) {
      dispatch(setProductTeamId(team_id));
    }
  };

  const onProdOwnerSelect = (item: string) => {
    const user = users.users.find((u) => `${u.fname} ${u.lname}` === item);
    if (user) {
      dispatch(setProductOwnerId(user.profileId));
    }
  };

  const teamOption = teams.map((t) => t.team_name);

  if (selectedProduct?.status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-72">
        <ImSpinner5 size={36} fill="#0099ff" className="rotating-image" />
      </div>
    );
  }

  const productName = prodName || productWithTeam.productName;

  //   const updateSucceded =
  //     formData.apiResponseStatus !== '' &&
  //     formData.apiResponseStatus === 'success';
  //   const updateFailed =
  //     formData.apiResponseStatus !== '' &&
  //     formData.apiResponseStatus === 'failed';

  //   if (updateSucceded) {
  //     return (
  //       <div>
  //         <GiConfirmed fill="#5cb85c" size="24" />
  //         <span>{formData.message}</span>
  //       </div>
  //     );
  //   }

  //   if (updateFailed) {
  //     return (
  //       <div>
  //         <MdError fill="#5cb85c" size="16" />
  //         <span>{formData.message}</span>
  //       </div>
  //     );
  //   }
  return (
    <div className="user-story-container bg-white p-2 min-h-96 grid grid-cols-1 content-between">
      <div>
        <div className="p-2">
          <coreComponents.Input
            label="Product Name"
            type="text"
            name="productName"
            placeholder="Product Name"
            onchange={onInputChange}
            value={productName}
            classes="text-base bg-white border-1 border-slate-300 outline-slate-400"
            disabled={disabled}
          />
        </div>
        <div className="p-2">
          <coreComponents.SearchableCombobox
            items={teamOption}
            onSelect={onTeamSelect}
            label="Team"
            value={productWithTeam.productTeam}
            disabled={disabled}
          />
        </div>
        <div className="p-2">
          <coreComponents.SearchableCombobox
            items={userList}
            onSelect={onProdOwnerSelect}
            label="Product Owner"
            value={productWithTeam.productOwnerName}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-max justify-end">
        <div className="p-2">
          <coreComponents.Button
            label="Login"
            type="primary"
            clickHandler={() => {}}
          />
        </div>
        <div className="p-2">
          <coreComponents.Button
            label="No Login"
            type="default"
            clickHandler={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
