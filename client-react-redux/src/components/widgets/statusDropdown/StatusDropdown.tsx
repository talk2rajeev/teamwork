import React, { useState } from 'react';
import { Button, MenuProps, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { wiStatusMap } from '../../../utils/constants';

function getWorkItemStatusList() {
  return Object.keys(wiStatusMap)
    .map((key) => wiStatusMap[key])
    .map((status) => ({ label: status.status, key: status.value }));
}

interface StatusDropdownProps {
  status:
    | 'New'
    | 'In-progress'
    | 'Ready for review'
    | 'Ready for QA'
    | 'Completed'
    | 'Closed';
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ status }) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', Number(e.key));
  };

  const items: MenuProps['items'] = getWorkItemStatusList();
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div>
      <Dropdown menu={menuProps} trigger={['click']}>
        <Button>
          <Space>
            {status}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default StatusDropdown;
