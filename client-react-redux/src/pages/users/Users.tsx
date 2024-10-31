import React, { useEffect, useState } from 'react';
import { Space, Table, TableProps, Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { startCase, camelCase } from 'lodash';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  userReducerState,
  getAllUsersAsync,
  getUserRolesAsync,
  createNewUsersAsync,
  resetCreateUserState,
} from '../../slices/users/userSlice';
import * as Types from '../../utils/types/types';
import { IoMdCreate } from 'react-icons/io';
import { AuthUtil } from '../../utils/auth/auth';
import CreateUser from '../../components/appComponents/createUser/CreateUser';
import UpdateUser from '../../components/appComponents/updateUser/UpdateUser';
import { showNotification } from '../../slices/notificationSlice/notificationSlice';

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
    title: 'App Role',
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
          data-action="update"
          data-profileId={user.profileId}
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
  const [showUpdateUserModal, setShowUpdateUserModal] =
    useState<boolean>(false);
  const [selectedUserIdForUpdate, setSelectedUserIdForUpdate] =
    useState<string>('');

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  useEffect(() => {
    if (
      userState.userCreated?.type === 'success' ||
      userState.userCreated?.type === 'error'
    ) {
      dispatch(
        showNotification({
          type: userState.userCreated?.type,
          title: startCase(camelCase(userState.userCreated?.type)),
          message: userState.userCreated.message || '',
        })
      );
    }
    return () => {
      dispatch(resetCreateUserState());
    };
  }, [userState.userCreated]);

  const openCreateUserModal = () => {
    dispatch(getUserRolesAsync());
    setShowCreateUserModal(true);
  };

  const hideCreateUserModal = () => {
    setShowCreateUserModal(false);
  };

  const selectedUserForUpdate = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    console.log('dataset ', dataset.profileid);
    setSelectedUserIdForUpdate(dataset.profileid || '');
    setShowUpdateUserModal(true);
  };

  const hideUpdateUserModal = () => {
    setShowUpdateUserModal(false);
  };

  const updateUser = (formData: any) => {};

  const createUser = (userFormData: Types.UserCreationReqPaylod) => {
    console.log('userForm ', userFormData);
    dispatch(createNewUsersAsync(userFormData));
    setShowCreateUserModal(false);
  };

  return (
    <div>
      {isAdmin && (
        <div className="mt-3 mb-3">
          <Tooltip title="Create new User" placement="right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={openCreateUserModal}
            />
          </Tooltip>
        </div>
      )}
      <Table
        columns={getColumns(selectedUserForUpdate)}
        dataSource={userState.allUsers.users}
      />
      <CreateUser
        userState={userState}
        showCreateUserModal={showCreateUserModal}
        hideCreateUserModal={hideCreateUserModal}
        createUser={createUser}
      />
      <UpdateUser
        userState={userState}
        selectedUserId={selectedUserIdForUpdate}
        showUpdateUserModal={showUpdateUserModal}
        hideUpdateUserModal={hideUpdateUserModal}
        updateUser={updateUser}
      />
    </div>
  );
};

export default Users;
