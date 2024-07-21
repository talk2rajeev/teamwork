import React, { useEffect } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getAllProductsAsync,
  productListObject,
} from '../../slices/product/productSlice';
import { IoMdEye, IoMdCreate } from 'react-icons/io';

const Product: React.FC = () => {
  const productListObj = useAppSelector(productListObject);
  const dispatch = useAppDispatch();
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  useEffect(() => {
    console.log('fetch product list > product.tsx');
    dispatch(getAllProductsAsync());
  }, []);

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
                    <span>
                      <IoMdEye
                        size="16"
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                      />
                    </span>
                    <span>
                      {userDetail?.profileId === p.product_owner_id ? (
                        <IoMdCreate
                          size="16"
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        />
                      ) : null}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
