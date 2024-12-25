import react, { useState, useEffect } from 'react';
import { Input, Select, Button, message } from 'antd';
import { AuthUtil } from '../../../utils/auth/auth';
import { getAllTeams, allTeams } from '../../../slices/team/teamSlice';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import * as Types from '../../../utils/types/types';
import UserSearchDropdown from '../../widgets/userSearchDropdown/UserSearchDropdown';

type CreateProductProps = {};

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const teams = useAppSelector(allTeams);
  const userDetail = AuthUtil.getUserDetail();

  const [createProductForm, setCreateProductForm] =
    useState<Types.CreateProductReqPayload>({
      productName: '',
      createdById: -1,
    });

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  const onProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateProductForm({
      ...createProductForm,
      productName: event.target.value,
    });
  };

  const onTeamChange = (value: number) => {
    setCreateProductForm({ ...createProductForm, teamId: value });
  };

  const onTeamSearch = (value: string) => {
    console.log('onTeamSearch ', value);
  };

  const onProductOwnerSelect = (user: Types.UserType) => {
    setCreateProductForm({
      ...createProductForm,
      product_owner_id: user.profileId,
    });
  };

  const createProduct = () => {
    const formData = {
      ...createProductForm,
      createdById: userDetail?.profileId,
    };
    if (!formData.productName) {
      return messageApi.open({
        type: 'error',
        content: "ProductName can't be empty.",
      });
    }
    console.log(formData);
  };

  const teamOptions = teams.teams.map((t) => ({
    value: t.team_id,
    label: t.team_name,
  }));

  return (
    <div className="user-story-container bg-white p-2  min-h-80 grid grid-cols-1 content-between">
      {contextHolder}
      <div>
        <div className="p-2">
          <div className="text-grey-700">Product Name</div>
          <Input
            placeholder="Product Name"
            onChange={onProductNameChange}
            size="middle"
          />
        </div>
        <div className="p-2">
          <div className="text-grey-700">Select Team</div>
          <Select
            onChange={onTeamChange}
            onSearch={onTeamSearch}
            showSearch
            style={{ width: '100%' }}
            placeholder="Search for Team"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={teamOptions}
          />
        </div>
        <div className="p-2">
          <UserSearchDropdown
            onUserSelect={onProductOwnerSelect}
            label="Product Owner"
            placeholder=""
            defaultProductOwnerId={userDetail?.profileId || -1}
          />
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-max justify-end">
        <Button type="primary" onClick={createProduct}>
          Create Product
        </Button>
      </div>
    </div>
  );
};

export default CreateProduct;
