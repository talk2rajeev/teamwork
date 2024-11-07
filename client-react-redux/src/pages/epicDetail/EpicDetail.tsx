import React, { useEffect, useState } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { Button, Tooltip } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import { epicState, getEpicsAsync } from '../../slices/epic/epicSlice';
import EpicList from '../../components/appComponents/epicList/EpicList';

const EpicDetail: React.FC = () => {
  const params = useParams<{ epicId: string }>();
  console.log('Params >>>>');
  console.log('Params', params);
  return (
    <Layout>
      <div>EpicDetail {params.epicId}</div>
    </Layout>
  );
};

export default EpicDetail;
