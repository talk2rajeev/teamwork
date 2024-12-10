import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CreateStory from '../../components/appComponents/createStory/CreateStory';
import Modal from '../../components/modal/Modal';
import * as coreComponents from '../../components/core-components';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getDetailedUserStoriesBySprintIdAsync,
  userStoryState,
  updateUserStoryAsync,
} from '../../slices/userStorySlice/userStorySlice';
import { epicState } from '../../slices/epic/epicSlice';
import UserStoryList from '../../components/appComponents/userStoryList/UserStoryList';
import UserStoryBoardView from '../../components/appComponents/userStoryBoardView/UserStoryBoardView';
import { Breadcrumb, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { MdDashboard } from 'react-icons/md';
import { FaList } from 'react-icons/fa';

type ViewType = 'list' | 'board';

const SprintBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const userStoryReducer = useAppSelector(userStoryState);
  const navigate = useNavigate();
  const epicReducer = useAppSelector(epicState);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [viewType, setViewType] = useState<ViewType>('list');
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { productId, sprintId } = useParams<{
    productId: string;
    sprintId: string;
  }>();

  useEffect(() => {
    if (productId && sprintId)
      dispatch(getDetailedUserStoriesBySprintIdAsync({ productId, sprintId }));
  }, [productId, sprintId]);

  const goBack = () => {
    navigate(-1);
  };

  const setView = (type: ViewType) => {
    setViewType(type);
  };

  const updateUserStory = (
    reqUserStoryId: string,
    reqProductId: string,
    reqSprintId: string,
    statusId: string
  ) => {
    // console.log(reqUserStoryId, reqProductId, reqSprintId, statusId);
    dispatch(
      updateUserStoryAsync({
        reqUserStoryId,
        reqProductId,
        reqSprintId,
        statusId: Number(statusId),
      })
    );
  };

  const sprintName = epicReducer.selectedEpicUserStories.epicUserStories.find(
    (e) => e.sprintId === Number(sprintId)
  )?.sprintName;

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
              title: sprintName,
            },
          ]}
        />
      </div>

      <div className="grid justify-items-start mb-2 pl-2">
        <div className="grid grid-cols-2 gap-2">
          <Tooltip title="List View">
            <FaList
              onClick={() => setView('list')}
              size="18"
              color={viewType === 'list' ? '#0099ff' : '#666'}
              className="cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Board View">
            <MdDashboard
              onClick={() => setView('board')}
              size="20"
              color={viewType === 'board' ? '#0099ff' : '#666'}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      </div>

      {viewType === 'list' ? (
        <UserStoryList
          userStories={userStoryReducer.detailedUserStory.userStories}
        />
      ) : (
        <div>
          <UserStoryBoardView
            userStories={userStoryReducer.detailedUserStory.userStories}
            updateUserStory={updateUserStory}
          />
        </div>
      )}

      <coreComponents.Button
        label="Create Story"
        type="primary"
        clickHandler={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create User Story"
        size="lg"
        footer={false}
      >
        <CreateStory />
      </Modal>
    </Layout>
  );
};

export default SprintBoard;
