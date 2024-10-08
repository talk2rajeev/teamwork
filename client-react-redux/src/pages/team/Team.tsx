import React, { useEffect, useState } from 'react';
import { Space, Table, Tooltip, Button, TableProps, notification } from 'antd';
import { AuthUtil } from '../../utils/auth/auth';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import UpdateTeam from '../../components/appComponents/updateTeam/UpdateTeam';
import {
  getAllTeams,
  getTeamsWithUserByTeamId,
  allTeams,
  selectedTeamId,
  updateTeamState,
  updateTeamNameAsync,
  idleTeamNameUpdateStatus,
  resetTeam,
} from '../../slices/team/teamSlice';
import * as Types from '../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';
import { PlusOutlined } from '@ant-design/icons';

const getColumns = (
  viewTeamDetail: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void,
  updateTeam: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.Team>['columns'] => [
  {
    title: 'Team Name',
    dataIndex: 'team_name',
    key: 'team_name',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Team Owner',
    dataIndex: 'created_by',
    key: 'created_by',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, team) => (
      <Space size="middle">
        <span
          data-action="view"
          data-teamid={team.team_id}
          onClick={viewTeamDetail}
        >
          <IoMdEye
            size="16"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </span>
        <span
          data-action="edit"
          data-teamid={team.team_id}
          onClick={updateTeam}
        >
          <IoMdCreate
            size="16"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </span>
      </Space>
    ),
  },
];

const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(allTeams);
  const selectedTeamIndex = useAppSelector(selectedTeamId);
  const updateTeamStateObject = useAppSelector(updateTeamState);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<'view' | 'update'>();
  const [teamNameEditMode, setTeamNameEditMode] = useState<boolean>(false);

  const [teamName, setTeamName] = useState<string>('');

  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  const [api, contextHolder] = notification.useNotification();
  type NotifType = 'success' | 'error';

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  useEffect(() => {
    setTeamNameEditMode(false);
    if (updateTeamStateObject.status === 'success') {
      api.success({
        message: 'Success',
        description: updateTeamStateObject.message,
        showProgress: true,
        duration: 0,
        onClose: () => {
          dispatch(idleTeamNameUpdateStatus());
        },
      });
    }
    if (updateTeamStateObject.status === 'failed') {
      api.success({
        message: 'Failed!',
        description: updateTeamStateObject.message,
        showProgress: true,
        duration: 0,
        onClose: () => {
          dispatch(idleTeamNameUpdateStatus());
        },
      });
    }
  }, [updateTeamStateObject.status]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    closeEditModal();
  };

  const handleCancel = () => {
    closeEditModal();
  };

  const closeEditModal = () => {
    dispatch(resetTeam());
    setIsModalOpen(false);
  };

  const toggleTeamNameEditMode = () => {
    setTeamNameEditMode(true);
  };

  const viewTeamDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    console.log(dataset);
    if (dataset.teamid) {
      setActionType('view');
      dispatch(getTeamsWithUserByTeamId(dataset.teamid));
      showModal();
    }
  };

  const initiateUpdateTeam = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    setTeamNameEditMode(false);
    if (dataset.teamid) {
      setActionType('update');
      dispatch(getTeamsWithUserByTeamId(dataset.teamid));
      showModal();
    }
  };

  const onTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const updateTeamName = () => {
    dispatch(
      updateTeamNameAsync({ teamId: selectedTeamIndex, teamName: teamName })
    );
  };

  const createTeam = () => {};

  const disabled = actionType === 'view';

  const data = teams.teams.map((t) => ({ ...t, key: t.team_id }));

  return (
    <div>
      {contextHolder}
      {isAdmin && (
        <div className="mt-3 mb-3">
          <Tooltip title="Create new team" placement="right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={createTeam}
            />
          </Tooltip>
        </div>
      )}
      {teams.status === 'loading' && teams.teams.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <Table
          columns={getColumns(viewTeamDetail, initiateUpdateTeam)}
          dataSource={data}
        />
      )}
      <UpdateTeam showModal={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default Team;
