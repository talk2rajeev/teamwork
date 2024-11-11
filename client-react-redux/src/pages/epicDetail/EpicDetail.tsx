import React, { useEffect, useState } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { Table, Tooltip, Breadcrumb, TableProps, Space } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import * as Types from '../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';
import {
  epicState,
  getEpicsAsync,
  getUserStoriesByEpicIdAsync,
} from '../../slices/epic/epicSlice';

// <div dangerouslySetInnerHTML={{ __html: e.description }} />

/*
userStoryId: number;
  title: string;
  description: string; <<
  userStoryPoint: number; <<
  createdAt: string;
  userStoryType: string;
  priority: string;
  assignedToFname: string; << 
  assignedToLname: string; << 
  assignedtoId: number;
  status: string; << 
  statusId: number;
  productName: string; <<
  productId: number;
  epicName: string;
  epicId: number;
  sprintName: string; <<
  sprintId: number;
  reportedByFname: string;
  reportedByLname: string;
  sotryReporterid: number;
*/

export const getEpicUserStoriesColumns = (
  viewEpicDetail: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.EpicUserStories>['columns'] => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Story Point',
    dataIndex: 'userStoryPoint',
    key: 'userStoryPoint',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Assigned To',
    key: 'productOwner',
    dataIndex: 'created_by',
    render: (_, epic) => (
      <Space size="middle">
        <span>
          {epic.assignedToFname} {epic.assignedToLname}
        </span>
      </Space>
    ),
  },
  {
    title: 'Product',
    dataIndex: 'productName',
    key: 'productName',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Sprint Name',
    key: 'sprintName',
    dataIndex: 'sprintName',
    render: (_, epic) => (
      <NavLink
        to={`/${epic.productId}/sprint`}
        className="block pt-1 pb-1 text-blue-600"
      >
        {epic.sprintName}
      </NavLink>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, epic) => (
      <Space size="middle">
        <span
          data-action="view"
          data-teamid={epic.epicId}
          onClick={viewEpicDetail}
        >
          <IoMdEye
            size="16"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </span>
      </Space>
    ),
  },
];

const EpicDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const epicReducer = useAppSelector(epicState);
  const params = useParams<{ epicId: string }>();

  console.log(params);

  useEffect(() => {
    if (epicReducer.epics.epicList.length === 0) dispatch(getEpicsAsync());
  }, []);

  useEffect(() => {
    if (params.epicId) dispatch(getUserStoriesByEpicIdAsync(params.epicId));
  }, [params.epicId]);

  const viewEpicDetail = () => {};

  const epicName = epicReducer.epics.epicList.find(
    (e) => e.epicId === Number(params.epicId)
  )?.epicName;

  return (
    <Layout>
      <Breadcrumb
        items={[
          {
            title: (
              <NavLink to={`/epics`} className="block pt-1 pb-1 text-blue-600">
                Epics
              </NavLink>
            ),
          },
          {
            title: epicName,
          },
        ]}
      />

      <div className="mt-3">
        <Table
          columns={getEpicUserStoriesColumns(viewEpicDetail)}
          dataSource={epicReducer.selectedEpicUserStories.epicUserStories}
        />
      </div>
    </Layout>
  );
};

export default EpicDetail;
