import React from 'react';
import { Space, Table, Tooltip, Button, TableProps } from 'antd';
import * as Types from '../../../utils/types/types';
import { AuthUtil } from '../../../utils/auth/auth';
import { NavLink } from 'react-router-dom';
import { FaExternalLinkAlt, FaEye, FaPencilAlt } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';

const getColumns = (
  viewProductDetail: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void,
  updateProduct: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.Product>['columns'] => {
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  return [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Product Owner',
      key: 'productOwner',
      dataIndex: 'created_by',
      render: (_, product) => (
        <Space size="middle">
          <span>
            {product.product_owner_fname} {product.product_owner_lname}
          </span>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, product) => (
        <Space size="middle">
          <Tooltip placement="top" title="Goto sprint board">
            <NavLink
              to={`${product.productId}/sprintList`}
              className="block pt-1 pb-1"
            >
              <FaExternalLinkAlt />
            </NavLink>
          </Tooltip>
          <Tooltip placement="top" title="Product Detail">
            <span
              data-action="view"
              data-productid={product.productId}
              onClick={viewProductDetail}
            >
              <FaEye
                size="16"
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </span>
          </Tooltip>
          {(isAdmin || product.product_owner_id === userDetail?.profileId) && (
            <Tooltip placement="top" title="Edit Product">
              <span
                data-action="edit"
                data-productid={product.productId}
                onClick={updateProduct}
              >
                <IoMdCreate
                  size="16"
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                />
              </span>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];
};

interface ProductListProps {
  productList: Array<Types.Product>;
  viewProductDetail: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
  updateProduct: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  productList,
  viewProductDetail,
  updateProduct,
}) => {
  const data = productList.map((p) => ({ ...p, key: p.productId }));
  return (
    <div>
      <Table
        columns={getColumns(viewProductDetail, updateProduct)}
        dataSource={data}
      />
    </div>
  );
};

export default ProductList;
