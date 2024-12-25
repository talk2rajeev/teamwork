import react, { useState, useEffect } from 'react';
import { Input, Select, Button, message } from 'antd';
import { AuthUtil } from '../../../utils/auth/auth';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import {
  productReducer,
  getAllProductsAsync,
} from '../../../slices/product/productSlice';

type CreateEpicReqPayload = {
  epicName: string;
  epicDescription: string;
  createdById: number;
  productId: number;
};
type CreateEpicProps = {};

const CreateEpic: React.FC<CreateEpicProps> = ({}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const productState = useAppSelector(productReducer);
  const userDetail = AuthUtil.getUserDetail();

  const [CreateEpicForm, setCreateEpicForm] = useState<CreateEpicReqPayload>({
    epicName: '',
    epicDescription: '',
    createdById: userDetail?.profileId || -1,
    productId: -1,
  });

  useEffect(() => {
    if (productState.list.productList.length === 0)
      dispatch(getAllProductsAsync());
  }, []);

  const onEpicNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateEpicForm({
      ...CreateEpicForm,
      epicName: event.target.value,
    });
  };

  const onEpicDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateEpicForm({
      ...CreateEpicForm,
      epicDescription: event.target.value,
    });
  };

  const onProductChange = (value: number) => {
    setCreateEpicForm({ ...CreateEpicForm, productId: value });
  };

  const isCreateFormValid = () => {
    return !!(
      CreateEpicForm.epicName &&
      CreateEpicForm.epicDescription &&
      CreateEpicForm.createdById !== -1 &&
      CreateEpicForm.productId !== -1
    );
  };

  const CreateEpic = () => {
    const formData = {
      ...CreateEpicForm,
      createdById: userDetail?.profileId,
    };
    if (isCreateFormValid()) {
      console.log(formData);
    } else {
      return messageApi.open({
        type: 'error',
        content: 'Please enter required field',
      });
    }
  };

  const productOptions = productState.list.productList.map((p) => ({
    value: p.productId,
    label: p.productName,
  }));

  return (
    <div className="user-story-container bg-white p-2  min-h-80 grid grid-cols-1 content-between">
      {contextHolder}
      <div>
        <div className="p-2">
          <div className="text-grey-700">
            Epic Name <span className="text-red-600">*</span>
          </div>
          <Input
            placeholder="Epic Name"
            onChange={onEpicNameChange}
            size="middle"
          />
        </div>
        <div className="p-2">
          <div className="text-grey-700">
            Epic Description <span className="text-red-600">*</span>
          </div>
          <Input
            placeholder="Epic Description"
            onChange={onEpicDescChange}
            size="middle"
          />
        </div>
        <div className="p-2">
          <div className="text-grey-700">
            Select Product <span className="text-red-600">*</span>
          </div>
          <Select
            onChange={onProductChange}
            showSearch
            style={{ width: '100%' }}
            placeholder="Search Product"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={productOptions}
          />
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-max justify-end">
        <Button
          type="primary"
          onClick={CreateEpic}
          disabled={!isCreateFormValid()}
        >
          Create Epic
        </Button>
      </div>
    </div>
  );
};

export default CreateEpic;
