import react, { useState, useEffect } from 'react';
import { Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import * as Types from '../../../../utils/types/types';

interface DeleteButtonProps {
  record: Types.TeamUser;
  deleteUser: (user: Types.TeamUser) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ record, deleteUser }) => {
  const confirmDelete = () => {
    deleteUser(record);
  };
  const handleCancel = () => {
    console.log('handleCancel');
  };

  return (
    <Space size="middle">
      <Popconfirm
        title="Confirm Delete."
        onConfirm={confirmDelete}
        onCancel={handleCancel}
      >
        <DeleteOutlined
          size={30}
          className="cursor-pointer text-gray-500 hover:text-gray-700 ant-icon-size"
          data-id={record.user_profile_id}
        />
      </Popconfirm>
    </Space>
  );
};

export default DeleteButton;
