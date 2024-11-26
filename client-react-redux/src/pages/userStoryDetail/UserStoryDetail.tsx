import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CreateStory from '../../components/appComponents/createStory/CreateStory';
import Modal from '../../components/modal/Modal';
import * as coreComponents from '../../components/core-components';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getDetailedUserStoriesByUserStoryIdAsync,
  userStoryState,
} from '../../slices/userStorySlice/userStorySlice';
import { epicState } from '../../slices/epic/epicSlice';
import UserStoryList from '../../components/appComponents/userStoryList/UserStoryList';
import { Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const UserStoryDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const userStoryReducer = useAppSelector(userStoryState);
  const navigate = useNavigate();

  const { productId, sprintId, userStoryId } = useParams<{
    productId: string;
    sprintId: string;
    userStoryId: string;
  }>();

  useEffect(() => {
    if (productId && sprintId && userStoryId)
      dispatch(
        getDetailedUserStoriesByUserStoryIdAsync({
          productId,
          sprintId,
          userStoryId,
        })
      );
  }, [productId, sprintId, userStoryId]);

  const goBack = () => {
    navigate(-1);
  };

  const userStory = userStoryReducer.selectedUserStory.userStory;

  return (
    <Layout>
      <div className="my-4">
        <Breadcrumb
          items={[
            {
              title: (
                <span
                  onClick={goBack}
                  className="hover:bg-gray-200 cursor-pointer pt-1 pb-1 px-2"
                >
                  <ArrowLeftOutlined />
                  <span> Back</span>
                </span>
              ),
            },
            {
              title: userStory?.sprintName,
            },
          ]}
        />
      </div>

      <div>
        {!!userStory && (
          <div>
            {userStory.title}
            <div className="html-content">
              <div
                dangerouslySetInnerHTML={{ __html: userStory.description }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserStoryDetail;
