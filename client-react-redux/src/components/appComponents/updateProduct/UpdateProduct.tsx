import react, { useState } from 'react';
import { ImSpinner5 } from 'react-icons/im';
import * as coreComponents from '../../core-components';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import * as Types from '../../../utils/types/types';
import { getProductWithTeam } from '../../../utils/helperFunctions/product/productHelper';
import { teamWithUsers } from '../../../slices/team/teamSlice';
import { allUsers } from '../../../slices/users/userSlice';

type UpdateProductProps = {
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: Types.ActionType;
  selectedProduct?: Types.SelectedProduct;
  product?: Types.Product;
};

type FormDataType = {
  productName?: string;
  product_owner_id?: number;
  teamId?: number;
};

const UpdateProduct: React.FC<UpdateProductProps> = ({
  inputChange,
  type,
  selectedProduct,
  product,
}) => {
  // Featch team list & create a listOption out of it for team combobox
  // Fetch UserProfileList & create a listOption out of it for productOwner combobox

  const teams = useAppSelector(teamWithUsers);
  const users = useAppSelector(allUsers);
  const productWithTeam = getProductWithTeam(selectedProduct, product);
  const userList = users.users.map((u) => `${u.fname} ${u.lname}`);

  const [formData, setFormData] = useState<FormDataType>();

  const debouncedInputChange = () => {};

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data?: any
  ) => {
    console.log(event.target.name, event.target.value);
    setFormData({ ...formData, productName: '' });
    inputChange(event);
  };

  const onTeamSelect = (item: string) => {
    console.log(item);
    const team_id = teams.find((t) => t.team_name === item)?.team_id;
    if (team_id) setFormData({ ...formData, teamId: team_id });
  };

  const onProdOwnerSelect = (item: string) => {
    console.log(item);
    const user = users.users.find((u) => `${u.fname} ${u.lname}` === item);
    if (user) setFormData({ ...formData, product_owner_id: user.profileId });
  };

  const teamOption = teams.map((t) => t.team_name);

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
            items={teamOption}
            onSelect={onTeamSelect}
            label="Team"
            value={productWithTeam.productTeam}
          />
        </div>
        <div className="p-2">
          <coreComponents.SearchableCombobox
            items={userList}
            onSelect={onProdOwnerSelect}
            label="Product Owner"
            value={productWithTeam.productOwnerName}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
