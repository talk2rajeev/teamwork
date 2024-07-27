import React, { useEffect, useState } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getAllProductsAsync,
  productListObject,
} from '../../slices/product/productSlice';
import { IoMdEye, IoMdCreate } from 'react-icons/io';
import Modal from '../../components/modal/Modal';

const Product: React.FC = () => {
  const [productDetail, setProductDetail] = useState<boolean>(false);
  const productListObj = useAppSelector(productListObject);
  const dispatch = useAppDispatch();
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  useEffect(() => {
    console.log('fetch product list > product.tsx');
    dispatch(getAllProductsAsync());
  }, []);

  const showProductDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setProductDetail(true);
    const targetElement = event.currentTarget as HTMLSpanElement;
    console.log(targetElement.dataset);
  };

  const hideProductDetail = () => {
    setProductDetail(false);
  };

  console.log('product >>>>>>> ', productListObj);

  return (
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
              <div className="grid grid-cols-3 gap-4 border-gray-200 border-b-1">
                <div className="pt-2 pb-2">{p.productName}</div>
                <div className="pt-2 pb-2">
                  {p.product_owner_fname} {p.product_owner_lname}
                </div>
                <div className="pt-2 pb-2  ">
                  <div className="flex gap-3">
                    <span
                      onClick={showProductDetail}
                      data-action="view"
                      data-prodid={p.productId}
                    >
                      <IoMdEye
                        size="16"
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                      />
                    </span>
                    {userDetail?.profileId === p.product_owner_id ? (
                      <span
                        onClick={showProductDetail}
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
        isOpen={productDetail}
        onClose={hideProductDetail}
        title="Product Detail"
        size="lg"
        footer={false}
      >
        <div>Product display</div>
      </Modal>
    </div>
  );
};

export default Product;
