import React, { useEffect, useState } from 'react';
import { Space, Table, Modal, Input, TableProps, notification } from 'antd';
import { AuthUtil } from '../../utils/auth/auth';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getAllTeams,
  getTeamsWithUserByTeamId,
  allTeams,
  selectedTeamId,
  updateTeamState,
  updateTeamNameAsync,
  idleTeamNameUpdateStatus,
} from '../../slices/team/teamSlice';
import * as Types from '../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { Spinner } from '../../components/core-components/icons/Icons';

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
    setTeamNameEditMode(false);
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
    setIsModalOpen(false);
    setTeamNameEditMode(true);
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

  const updateTeam = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    console.log(dataset);
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
    console.log(selectedTeamIndex, teamName);
    dispatch(
      updateTeamNameAsync({ teamId: selectedTeamIndex, teamName: teamName })
    );
  };

  const disabled = actionType === 'view';

  return (
    <div>
      {contextHolder}
      {isAdmin && <div>Create Team</div>}
      {teams.status === 'loading' && teams.teams.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <Table
          columns={getColumns(viewTeamDetail, updateTeam)}
          dataSource={teams.teams}
        />
      )}
      <Modal
        title="Team"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        {teams.teams
          .filter((t) => t.team_id === selectedTeamIndex)
          .map((t) => {
            return (
              <div key={t.team_id}>
                {!teamNameEditMode ? (
                  <div className="p-2 border-b-2 grid grid-flow-col auto-cols-max justify-between">
                    <span>{t.team_name}</span>
                    <IoMdCreate
                      size="16"
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={toggleTeamNameEditMode}
                    />
                  </div>
                ) : (
                  <div className="p-2 grid grid-cols-5 auto-cols-max justify-between">
                    <div className="col-span-4">
                      <label>Team Name</label>
                      <Input
                        placeholder="Team name"
                        defaultValue={t.team_name}
                        onChange={onTeamChange}
                        disabled={disabled}
                        size="middle"
                      />
                    </div>
                    <div className="flex items-end">
                      {updateTeamStateObject.status === 'loading' ? (
                        <Spinner />
                      ) : (
                        <TiTick
                          size="28"
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={updateTeamName}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="p-2">
                  <label>Created By</label>
                  <div>
                    {t.created_by_fname} {t.created_by_lname}
                  </div>
                </div>

                <div className="p-2">
                  {t.users?.map((u) => (
                    <div
                      className="pb-2 grid grid-cols-2 gap-4"
                      key={u.user_profile_id}
                    >
                      <span>
                        {u.first_name} {u.last_name}
                      </span>
                      <span>{u.role_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </Modal>
    </div>
  );
};

export default Team;
