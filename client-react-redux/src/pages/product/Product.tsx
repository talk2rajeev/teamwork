import React, { useEffect, useState } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
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
import { notification } from 'antd';

const Product: React.FC = () => {
  const [showProductDetail, setShowProductDetail] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>('view');
  const productListObj = useAppSelector(productListObject);
  const selectedProdId = useAppSelector(selectedProductId);
  const selectedProductObj = useAppSelector(selectedProduct);
  const formData = useAppSelector(updateProductFormData);

  const dispatch = useAppDispatch();
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  const [api, contextHolder] = notification.useNotification();

  type NotifType = 'success' | 'error';

  // const openNotification = (
  //   type: NotifType,
  //   title: string,
  //   message: string
  // ) => {
  //   console.log('openNotification called');
  //   if (type === 'success') {
  //     return api.success({
  //       message: title,
  //       description: message,
  //       showProgress: true,
  //       duration: 0,
  //       onClose: () => {
  //         dispatch(clearProductForm());
  //       },
  //     });
  //   } else if (type === 'error') {
  //     return api.error({
  //       message: title,
  //       description: message,
  //       showProgress: true,
  //       duration: 0,
  //       onClose: () => {
  //         dispatch(clearProductForm());
  //       },
  //     });
  //   } else {
  //     return api.info({
  //       message: title,
  //       description: message,
  //       showProgress: true,
  //       duration: 0,
  //       onClose: () => {
  //         dispatch(clearProductForm());
  //       },
  //     });
  //   }
  // };

  useEffect(() => {
    dispatch(getAllProductsAsync());
    dispatch(getTeamsWithUsersAsync());
    dispatch(getAllUsersAsync());
  }, []);

  // useEffect(() => {
  //   console.log('useEffect > openNotification');
  //   if (formData.apiResponseStatus === 'success') {
  //     console.log('useEffect > success');
  //     openNotification('success', 'Success!', formData.message);
  //   }
  //   if (formData.apiResponseStatus === 'failed') {
  //     console.log('useEffect > fail');
  //     openNotification('error', 'Failed!', formData.message);
  //   }
  // }, [formData]);

  const updateProduct = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setActionType('update');
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
    setActionType('view');
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
  };

  const product = productListObj.productList.find(
    (p) => p.productId === selectedProdId
  );

  const editProps =
    actionType !== 'view' && !formData.apiResponseStatus
      ? {
          onPrimaryBtnClick: updateProductDetail,
        }
      : {};

  return (
    <>
      {contextHolder}
      <div className="mt-4">
        {isAdmin && <div>Create Product</div>}
        {productListObj.status === 'loading' ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <div className="container bg-white p-4">
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
            </div>
          </div>
        )}
        <Modal
          isOpen={showProductDetail}
          onClose={hideProductDetail}
          {...editProps}
          title="Product Detail"
          size="md"
          footer={true}
        >
          <UpdateProduct
            type={actionType}
            selectedProduct={selectedProductObj}
            product={product}
          />
        </Modal>
      </div>
    </>
  );
};

export default Product;
