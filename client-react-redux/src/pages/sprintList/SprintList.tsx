import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getSprintListByProductIdAsync,
  springReducer,
} from '../../slices/sprint/sprintSlice';
import {
  getAllProductsAsync,
  productReducer,
} from '../../slices/product/productSlice';
import SprintSearchDropdown from '../../components/widgets/sprintSearchDropdown/SprintSearchDropdown';
import { Breadcrumb, Table, TableProps } from 'antd';
import * as Types from '../../utils/types/types';
import moment from 'moment';

const getColumns = (): TableProps<Types.Sprint>['columns'] => {
  return [
    {
      title: 'Sprint Name',
      dataIndex: 'sprintName',
      key: 'sprintName',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Start Date',
      key: 'startDate',
      dataIndex: 'startDate',
      render: (text) => <span>{moment(text).format('LL')}</span>,
    },
    {
      title: 'End Date',
      key: 'endDate',
      dataIndex: 'endDate',
      render: (text) => <span>{moment(text).format('LL')}</span>,
    },
  ];
};

const SprintList: React.FC = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector(productReducer);
  const sprintState = useAppSelector(springReducer);

  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    dispatch(getAllProductsAsync());
    if (productId) dispatch(getSprintListByProductIdAsync(productId));
  }, [productId]);

  const productName = productState.list.productList.find(
    (p) => p.productId === Number(productId)
  )?.productName;

  console.log(productId);
  return (
    <Layout>
      {/* <div className="mb-4 mt-4">
        Project /&nbsp;
        <Popover
          title="Change Product"
          content={
            <coreComponents.SearchableCombobox
              items={['Epirurian', 'Next Gen', 'OMDS', 'Managed Extensions']}
              onSelect={(item: string) => {
                console.log(item);
              }}
              label="Product Name"
              placeholder="Search Product"
            />
          }
        >
          {productName}
        </Popover>
      </div> */}
      <Breadcrumb
        items={[
          {
            title: (
              <NavLink
                to={`/product`}
                className="block pt-1 pb-1 text-blue-600"
              >
                Products
              </NavLink>
            ),
          },
          {
            title: productName,
          },
        ]}
      />

      {/* <h1>Sprint List</h1>
      <SprintSearchDropdown /> */}

      <div className="mt-6">
        <Table
          columns={getColumns()}
          dataSource={sprintState.sprint.sprintList}
        />
      </div>
    </Layout>
  );
};

export default SprintList;
