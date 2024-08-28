import React, { useEffect, useState } from 'react';
import { Space, Table, Modal, Input } from 'antd';
import type { TableProps } from 'antd';
import { AuthUtil } from '../../utils/auth/auth';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getAllTeams,
  getTeamsWithUserByTeamId,
  allTeams,
  selectedTeamId,
} from '../../slices/team/teamSlice';
import * as coreComponents from '../../components/core-components';
import * as Types from '../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<'view' | 'update'>();

  // const [teamFormData, setTeamFormData] = useState<>();

  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
    // setTeamName(event.target.value);
  };

  const disabled = actionType === 'view';

  return (
    <div>
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
              <div>
                <div className="p-2">
                  <label>Team Name</label>
                  <Input
                    placeholder="Team name"
                    defaultValue={t.team_name}
                    onChange={onTeamChange}
                    disabled={disabled}
                    size="middle"
                  />
                </div>
                <div className="p-2">
                  <label>Created By</label>
                  <div>
                    {t.created_by_fname} {t.created_by_lname}
                  </div>
                </div>

                <div className="p-2">
                  {t.users?.map((u) => (
                    <div className="pb-2 grid grid-cols-2 gap-4">
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
