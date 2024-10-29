import React, { useEffect, useState } from 'react';
import { Space, Table, TableProps, Tooltip, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  userReducerState,
  getAllUsersAsync,
} from '../../slices/users/userSlice';
import * as Types from '../../utils/types/types';
import { IoMdCreate } from 'react-icons/io';
import { AuthUtil } from '../../utils/auth/auth';

const getColumns = (
  updateUser: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.UserType>['columns'] => [
  {
    title: 'First Name',
    dataIndex: 'fname',
    key: 'fname',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Last Name',
    dataIndex: 'lname',
    key: 'lname',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Role',
    dataIndex: 'roleName',
    key: 'roleName',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, user) => (
      <Space size="middle">
        <span
          data-action="view"
          data-productid={user.profileId}
          onClick={updateUser}
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

const Users: React.FC = () => {
  const userState = useAppSelector(userReducerState);
  const dispatch = useAppDispatch();
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  const [showCreateUserModal, setShowCreateUserModal] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  const updateUser = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {};

  return (
    <div>
      {isAdmin && (
        <div className="mt-3 mb-3">
          <Tooltip title="Create new User" placement="right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={() => setShowCreateUserModal(true)}
            />
          </Tooltip>
        </div>
      )}
      <Table
        columns={getColumns(updateUser)}
        dataSource={userState.allUsers.users}
      />
      <Modal
        title="Create User"
        open={showCreateUserModal}
        onCancel={() => setShowCreateUserModal(false)}
        width={800}
        footer={null}
      >
        <h1>Create User</h1>
      </Modal>
    </div>
  );
};

export default Users;
