import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import * as Types from '../../../utils/types/types';

interface CreateUserInterface {
  userState: Types.UserState;
  showCreateUserModal: boolean;
  hideCreateUserModal: () => void;
  createUser: (userFormData: Types.UserCreationReqPaylod) => void;
}

const CreateUser: React.FC<CreateUserInterface> = ({
  userState,
  showCreateUserModal,
  hideCreateUserModal,
  createUser,
}) => {
  const [userForm, setUserForm] = useState<Types.UserCreationReqPaylod>({
    username: '',
    password: '',
    fname: '',
    lname: '',
    role_id: -1,
  });

  const onChange = (value: string) => {
    setUserForm({ ...userForm, role_id: Number(value) });
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const onCreateUser = () => {
    console.log('userForm ', userForm);
    createUser(userForm);
  };

  const roleOptions = userState.roles.map((r) => ({
    value: r.roleId,
    label: r.roleName,
  }));

  const createBtnDisabled = !(
    userForm.fname &&
    userForm.lname &&
    userForm.username &&
    userForm.password &&
    userForm.role_id !== -1
  );

  return (
    <Modal
      title="Create New User"
      open={showCreateUserModal}
      onCancel={hideCreateUserModal}
      width={800}
      footer={null}
    >
      <div className="user-story-container bg-white p-2  min-h-80 grid grid-cols-1 content-between">
        <div>
          <div className="p-2 grid grid-cols-2 gap-4">
            <div>
              <div className="text-grey-700">Username</div>
              <Input
                placeholder="Username"
                size="middle"
                name="username"
                onChange={inputChange}
              />
            </div>
            <div>
              <div className="text-grey-700">Password</div>
              <Input.Password
                placeholder="input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                name="password"
                onChange={inputChange}
              />
            </div>
          </div>
          <div className="p-2 grid grid-cols-2 gap-4">
            <div>
              <div className="text-grey-700">First Name</div>
              <Input
                placeholder="Fist Name"
                size="middle"
                name="fname"
                onChange={inputChange}
              />
            </div>
            <div>
              <div className="text-grey-700">Last Name</div>
              <Input
                placeholder="Last Name"
                size="middle"
                name="lname"
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
            />
          </div>
          <div className="p-2"></div>
        </div>
        <div className="grid grid-flow-col auto-cols-max justify-end">
          <Button
            type="primary"
            onClick={onCreateUser}
            disabled={createBtnDisabled}
          >
            Create User
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateUser;
