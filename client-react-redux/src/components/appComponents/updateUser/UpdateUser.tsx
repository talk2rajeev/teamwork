import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import * as Types from '../../../utils/types/types';

interface UpdateUserInterface {
  userState: Types.UserState;
  selectedUserId: string;
  hideUpdateUserModal: () => void;
  updateUser: (userFormData: Types.UserUpdateReqPaylod) => void;
}

const UpdateUser: React.FC<UpdateUserInterface> = ({
  userState,
  selectedUserId,
  hideUpdateUserModal,
  updateUser,
}) => {
  const showUpdateUserModal = !!selectedUserId;

  const selectedUser = userState.allUsers.users.find(
    (u) => u.profileId === Number(selectedUserId)
  );
  const initUpdateUserForm = {
    fname: selectedUser?.fname ?? '',
    lname: selectedUser?.lname ?? '',
    role_id: selectedUser?.roleId ?? -1,
  };

  const [userForm, setUserForm] =
    useState<Types.UserUpdateReqPaylod>(initUpdateUserForm);

  const onChange = (value: string) => {
    setUserForm({ ...userForm, role_id: Number(value) });
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const onUpdateUser = () => {
    updateUser(userForm);
  };

  const roleOptions = userState.roles.map((r) => ({
    value: r.roleId,
    label: r.roleName,
  }));

  const defaultRole = userState.roles.find(
    (r) => r.roleId === Number(selectedUser?.roleId)
  );

  console.log(selectedUser, defaultRole);

  return (
    <Modal
      title="Update User"
      open={showUpdateUserModal}
      onCancel={hideUpdateUserModal}
      width={800}
      footer={null}
    >
      <div className="user-story-container bg-white p-2  min-h-80 grid grid-cols-1 content-between">
        <div>
          <div className="p-2 grid grid-cols-2 gap-4">
            <div>
              <div className="text-grey-700">First Name</div>
              <Input
                placeholder="Fist Name"
                size="middle"
                name="fname"
                defaultValue={selectedUser?.fname}
                onChange={inputChange}
              />
            </div>
            <div>
              <div className="text-grey-700">Last Name</div>
              <Input
                placeholder="Last Name"
                size="middle"
                name="lname"
                defaultValue={selectedUser?.lname}
                onChange={inputChange}
              />
            </div>
          </div>
          <div className="p-2">
            <div className="text-grey-700">Select Team</div>
            <Select
              showSearch
              placeholder="Assign Role"
              onChange={onChange}
              onSearch={onSearch}
              style={{ width: '100%' }}
              optionFilterProp="label"
              options={roleOptions}
              defaultValue={defaultRole?.roleName}
            />
          </div>
          <div className="p-2"></div>
        </div>
        <div className="grid grid-flow-col auto-cols-max justify-end">
          <Button type="primary" onClick={onUpdateUser}>
            Update User
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUser;
