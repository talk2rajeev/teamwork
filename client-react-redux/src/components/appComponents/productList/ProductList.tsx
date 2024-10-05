import React from 'react';
import { Space, Table, TableProps } from 'antd';
import * as Types from '../../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';

/*
productId: number;
  productName: string;
  product_owner_id: number;
  product_owner_fname: string;
  product_owner_lname: string;
*/

const getColumns = (
  viewProductDetail: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void,
  updateProduct: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.Product>['columns'] => [
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
        <span
          data-action="view"
          data-productid={product.productId}
          onClick={viewProductDetail}
        >
          <IoMdEye
            size="16"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </span>
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
      </Space>
    ),
  },
];

interface ProductListProps {
  productList: Array<Types.Product>;
}

const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  const viewProductDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {};

  const initiateUpdateProduct = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {};

  const data = productList.map((p) => ({ ...p, key: p.productId }));
  return (
    <div>
      <Table
        columns={getColumns(viewProductDetail, initiateUpdateProduct)}
        dataSource={data}
      />
    </div>
  );
};

export default ProductList;
