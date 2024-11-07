import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { AuthUtil } from '../../utils/auth/auth';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Epics: React.FC = () => {
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  const [showCreateEpic, setShowCreateEpic] = useState<boolean>(false);

  const showCreateEpicSection = () => {
    setShowCreateEpic(true);
  };

  const hideCreateEpicSection = () => {
    setShowCreateEpic(false);
  };

  return (
    <Layout>
      {isAdmin && !showCreateEpic ? (
        <div className="mt-3 mb-3">
          <Tooltip title="Create new team" placement="right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={showCreateEpicSection}
            />
          </Tooltip>
        </div>
      ) : (
        <div className="mt-3 mb-4">Create Epic</div>
      )}
      <h2>Epics Page</h2>
    </Layout>
  );
};

export default Epics;
