import React, { useEffect, useState } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { Tooltip, Spin, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getAllProductsAsync,
  getProductWithTeamAsync,
  updateProductAsync,
  setSelectedProductId,
  clearSelectedProduct,
  clearProductForm,
  productReducer,
} from '../../slices/product/productSlice';
import {
  allTeams,
  getAllTeams,
  getTeamsWithUsersAsync,
} from '../../slices/team/teamSlice';
import { getAllUsersAsync } from '../../slices/users/userSlice';
import Modal from '../../components/modal/Modal';
import UpdateProduct from '../../components/appComponents/updateProduct/UpdateProduct';
import { ActionType } from '../../utils/types/types';
import CreateProduct from '../../components/appComponents/createProduct/CreateProduct';
import ProductList from '../../components/appComponents/productList/ProductList';
import { showNotification } from '../../slices/notificationSlice/notificationSlice';

const Product: React.FC = () => {
  const [showProductDetail, setShowProductDetail] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>('View');
  const [showCreateProductForm, setShowCreateProductForm] =
    useState<boolean>(false);
  const productState = useAppSelector(productReducer);
  const allTeamsObject = useAppSelector(allTeams);
  const productListObj = productState.list;
  const selectedProdId = productState.selectedProductId;
  const selectedProductObj = productState.selectedProduct;
  const prodFormData = productState.productFormData;

  const dispatch = useAppDispatch();
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  useEffect(() => {
    dispatch(getAllProductsAsync());
    dispatch(getTeamsWithUsersAsync());
    dispatch(getAllUsersAsync());
    dispatch(getAllTeams());
  }, []);

  const updateProduct = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setActionType('Update');
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    dispatch(setSelectedProductId(Number(dataset.productid)));
    dispatch(getProductWithTeamAsync(Number(dataset.productid)));
    setShowProductDetail(true);
  };

  const viewProductDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setShowProductDetail(true);
    setActionType('View');
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    dispatch(setSelectedProductId(Number(dataset.productid)));
    dispatch(getProductWithTeamAsync(Number(dataset.productid)));
  };

  const hideProductDetail = () => {
    setShowProductDetail(false);
    dispatch(clearSelectedProduct());
    dispatch(clearProductForm());
  };

  const updateProductDetail = () => {
    if (
      prodFormData.productName ||
      prodFormData.product_owner_id ||
      prodFormData.teamId
    ) {
      dispatch(updateProductAsync());
    } else {
      console.log('updateProductDetail > showNotification called');
      dispatch(
        showNotification({
          type: 'error',
          title: 'Failed.',
          message: 'Bad request',
        })
      );
    }
    hideProductDetail();
  };

  const show = () => {
    showNotification({
      type: 'error',
      title: 'Failed.',
      message: 'Bad request',
    });
  };

  const createProductDetail = () => {
    dispatch(updateProductAsync());
  };

  const createProduct = () => {
    setActionType('Create');
    setShowCreateProductForm(true);
  };

  const closeCreateProductForm = () => {
    setShowCreateProductForm(false);
  };

  const product = productListObj.productList.find(
    (p) => p.productId === selectedProdId
  );

  const editProps =
    actionType === 'Create'
      ? {
          onPrimaryBtnClick: createProductDetail,
        }
      : actionType === 'Update'
        ? {
            onPrimaryBtnClick: updateProductDetail,
          }
        : { onPrimaryBtnClick: () => {} };

  return (
    <>
      <div className="mt-4">
        {isAdmin && (
          <div className="mt-3 mb-3">
            <Tooltip title="Create new product" placement="right">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="middle"
                onClick={createProduct}
              />
            </Tooltip>
          </div>
        )}
        <button onClick={show}>notif</button>
        {productListObj.status === 'loading' ? (
          <div className="min-h-screen grid grid-cols-1 gap-4 content-center">
            <Spin size="large" />
          </div>
        ) : (
          <ProductList
            productList={productListObj.productList}
            viewProductDetail={viewProductDetail}
            updateProduct={updateProduct}
          />
        )}
        <Modal
          isOpen={showProductDetail}
          onClose={hideProductDetail}
          title="Product Detail"
          size="md"
          footer={false}
        >
          <UpdateProduct
            type={actionType}
            productState={productState}
            teams={allTeamsObject.teams}
            product={product}
            {...editProps}
            onClose={hideProductDetail}
          />
        </Modal>

        <Modal
          isOpen={showCreateProductForm}
          onClose={closeCreateProductForm}
          title="Create Product"
          size="sm"
          footer={false}
        >
          <CreateProduct />
        </Modal>
      </div>
    </>
  );
};

export default Product;
