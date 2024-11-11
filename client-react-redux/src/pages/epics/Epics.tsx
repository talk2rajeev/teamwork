import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { AuthUtil } from '../../utils/auth/auth';
import { Button, Tooltip, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import { epicState, getEpicsAsync } from '../../slices/epic/epicSlice';
import EpicList from '../../components/appComponents/epicList/EpicList';
// import {uniqBy} from 'lodash';

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

  const onProductChange = (value: number) => {
    console.log('onProductChange', value);
  };

  const onProductSearch = (value: string) => {
    console.log('onProductSearch ', value);
  };

  const productOptions = epicReducer.epics.epicList.map((u) => ({
    value: u.productId,
    label: u.productName,
  }));

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

      <div>
        <div className="w-72 mb-4">
          <Select
            onChange={onProductChange}
            onSearch={onProductSearch}
            variant="outlined"
            placeholder="Filter Epics By Product"
            showSearch
            className="w-full"
            optionFilterProp="label"
            options={productOptions}
          />
        </div>
        <EpicList
          updateEpic={updateEpic}
          viewEpicDetail={viewEpicDetail}
          epicList={epicList}
        />
      </div>
    </Layout>
  );
};

export default Epics;
