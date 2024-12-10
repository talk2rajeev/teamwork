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

export const getEpicUserStoriesColumns = (
  viewEpicDetail: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.EpicUserStories>['columns'] => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (_, userStory) => (
      <NavLink
        to={`/userStoryDetail/${userStory.productId}/${userStory.sprintId}/${userStory.userStoryId}`}
        className="block pt-1 pb-1 text-blue-600"
      >
        {userStory.title}
      </NavLink>
    ),
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
    render: (_, userStory) => (
      <Space size="middle">
        <span>
          {userStory.assignedToFname} {userStory.assignedToLname}
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
    render: (_, userStory) => (
      <NavLink
        to={`/${userStory.productId}/sprint/${userStory.sprintId}`}
        className="block pt-1 pb-1 text-blue-600"
      >
        {userStory.sprintName} {userStory.productId}
      </NavLink>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, userStory) => (
      <Space size="middle">
        <span
          data-action="view"
          data-teamid={userStory.epicId}
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

  const epicStories = epicReducer.selectedEpicUserStories.epicUserStories.map(
    (a) => ({ ...a, key: a.userStoryId })
  );

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
          dataSource={epicStories}
        />
      </div>
    </Layout>
  );
};

export default EpicDetail;
