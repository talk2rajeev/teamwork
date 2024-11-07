import React from 'react';
import { Tooltip, Table, Space, TableProps } from 'antd';
import { NavLink } from 'react-router-dom';
import * as Types from '../../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';

export const getEpicColumns = (
  viewEpicDetail: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void,
  updateEpic: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.EpicType>['columns'] => [
  {
    title: 'Epic Name',
    dataIndex: 'epicName',
    key: 'epicName',
    render: (_, epic) => (
      <NavLink
        to={`/epics/${epic.epicId}`}
        className="block pt-1 pb-1 text-blue-600"
      >
        {epic.epicName}
      </NavLink>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'epicDescription',
    key: 'epicDescription',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Product',
    dataIndex: 'productName',
    key: 'productName',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Product Owner',
    key: 'productOwner',
    dataIndex: 'created_by',
    render: (_, epic) => (
      <Space size="middle">
        <span>
          {epic.created_by_fname} {epic.created_by_lname}
        </span>
      </Space>
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
        <span data-action="edit" data-teamid={epic.epicId} onClick={updateEpic}>
          <Tooltip title="Update Team, Add user to Team" placement="right">
            <IoMdCreate
              size="16"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
          </Tooltip>
        </span>
      </Space>
    ),
  },
];

interface EpicListProps {
  epicList: Types.EpicType[];
  viewEpicDetail: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
  updateEpic: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const EpicList: React.FC<EpicListProps> = ({
  epicList,
  viewEpicDetail,
  updateEpic,
}) => {
  return (
    <Table
      columns={getEpicColumns(viewEpicDetail, updateEpic)}
      dataSource={epicList}
    />
  );
};

export default EpicList;
