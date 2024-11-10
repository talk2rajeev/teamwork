import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { AuthUtil } from '../../utils/auth/auth';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import { epicState, getEpicsAsync } from '../../slices/epic/epicSlice';
import EpicList from '../../components/appComponents/epicList/EpicList';

const Epics: React.FC = () => {
  const dispatch = useAppDispatch();
  const epicReducer = useAppSelector(epicState);

  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  const [showCreateEpic, setShowCreateEpic] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEpicsAsync());
  }, []);

  const showCreateEpicSection = () => {
    setShowCreateEpic(true);
  };

  const hideCreateEpicSection = () => {
    setShowCreateEpic(false);
  };

  const viewEpicDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    console.log(dataset);
  };

  const updateEpic = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    console.log(dataset);
  };

  const epicList = epicReducer.epics.epicList.map((e) => ({
    ...e,
    key: e.epicId,
  }));

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

      <EpicList
        updateEpic={updateEpic}
        viewEpicDetail={viewEpicDetail}
        epicList={epicList}
      />
    </Layout>
  );
};

export default Epics;
