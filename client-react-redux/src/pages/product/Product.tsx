import React, { useEffect, useState } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { Tooltip, Spin, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getAllProductsAsync,
  getProductWithTeamAsync,
  updateProductAsync,
  productListObject,
  selectedProductId,
  setSelectedProductId,
  selectedProduct,
  clearSelectedProduct,
  updateProductFormData,
  clearProductForm,
} from '../../slices/product/productSlice';
import { getTeamsWithUsersAsync } from '../../slices/team/teamSlice';
import { getAllUsersAsync } from '../../slices/users/userSlice';
import Modal from '../../components/modal/Modal';
import UpdateProduct from '../../components/appComponents/updateProduct/UpdateProduct';
import { ActionType } from '../../utils/types/types';
import CreateProduct from '../../components/appComponents/createProduct/CreateProduct';
import * as Types from '../../utils/types/types';
import ProductList from '../../components/appComponents/productList/ProductList';

const Product: React.FC = () => {
  const [showProductDetail, setShowProductDetail] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>('View');
  const [showCreateProductForm, setShowCreateProductForm] =
    useState<boolean>(false);
  const productListObj = useAppSelector(productListObject);
  const selectedProdId = useAppSelector(selectedProductId);
  const selectedProductObj = useAppSelector(selectedProduct);

  const dispatch = useAppDispatch();
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  useEffect(() => {
    dispatch(getAllProductsAsync());
    dispatch(getTeamsWithUsersAsync());
    dispatch(getAllUsersAsync());
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
    dispatch(updateProductAsync());
    hideProductDetail();
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
        {productListObj.status === 'loading' ? (
          <div className="min-h-screen grid grid-cols-1 gap-4 content-center">
            <Spin tip="Loading" size="large" />
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
            selectedProduct={selectedProductObj}
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
