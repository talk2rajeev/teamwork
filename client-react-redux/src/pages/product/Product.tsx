import React, { useEffect, useState } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { Tooltip } from 'antd';
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
import { IoMdEye, IoMdCreate } from 'react-icons/io';
import Modal from '../../components/modal/Modal';
import UpdateProduct from '../../components/appComponents/updateProduct/UpdateProduct';
import { ActionType } from '../../utils/types/types';
import ViewProduct from '../../components/appComponents/viewProduct/ViewProduct';
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
    dispatch(setSelectedProductId(Number(dataset.prodid)));
    dispatch(getProductWithTeamAsync(Number(dataset.prodid)));
    setShowProductDetail(true);
  };

  const viewProductDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setShowProductDetail(true);
    setActionType('View');
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    dispatch(setSelectedProductId(Number(dataset.prodid)));
    dispatch(getProductWithTeamAsync(Number(dataset.prodid)));
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
    setShowCreateProductForm(true);
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
              <PlusOutlined
                size={38}
                className="cursor-pointer text-gray-500 hover:text-gray-700 rounded-full border-2 border-slate-500 ant-icon-size"
                onClick={createProduct}
              />
            </Tooltip>
          </div>
        )}
        {productListObj.status === 'loading' ? (
          <h1>Loading</h1>
        ) : (
          <div>
            {/* <div className="container bg-white p-4">
              <div className="grid grid-cols-3 gap-4 border-gray-200 border-b-1">
                <div className="pt-2 pb-2 font-semibold">Product Name</div>
                <div className="pt-2 pb-2 font-semibold">Product owner</div>
                <div className="pt-2 pb-2 font-semibold">Action</div>
              </div>
              {productListObj.productList.map((p) => (
                <div
                  key={p.productId}
                  className="grid grid-cols-3 gap-4 border-gray-200 border-b-1"
                >
                  <div className="pt-2 pb-2">{p.productName}</div>
                  <div className="pt-2 pb-2">
                    {p.product_owner_fname} {p.product_owner_lname}
                  </div>
                  <div className="pt-2 pb-2  ">
                    <div className="flex gap-3">
                      <span
                        onClick={viewProductDetail}
                        data-action="view"
                        data-prodid={p.productId}
                      >
                        <IoMdEye
                          size="16"
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        />
                      </span>
                      {userDetail?.profileId === p.product_owner_id ||
                      isAdmin ? (
                        <span
                          onClick={updateProduct}
                          data-action="edit"
                          data-prodid={p.productId}
                        >
                          <IoMdCreate
                            size="16"
                            className="cursor-pointer text-gray-500 hover:text-gray-700"
                          />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            <ProductList productList={productListObj.productList} />
          </div>
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
      </div>
    </>
  );
};

export default Product;
