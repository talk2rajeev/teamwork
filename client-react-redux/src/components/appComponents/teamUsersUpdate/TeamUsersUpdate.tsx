//TeamUsersUpdate
import react, { useState, useEffect, useReducer } from 'react';
import { Table, Space, Tag, TableProps, Tooltip } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import { selectedTeamId, allTeams } from '../../../slices/team/teamSlice';
import { TeamUser } from '../../../utils/types/types';
import { DeleteOutlined } from '@ant-design/icons';

interface KeyType {
  key: number;
}

type TeamUserType = TeamUser & KeyType;

const getColumns = (
  deleteUserFromTeam: (id: number) => void
): TableProps<TeamUser>['columns'] => [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Role',
    key: 'role_name',
    dataIndex: 'role_name',
    render: (text) => <Tag color="geekblue">{text}</Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <span onClick={() => deleteUserFromTeam(record.user_profile_id)}>
          <Tooltip title="Remove user from team." placement="top">
            <DeleteOutlined
              size={30}
              className="cursor-pointer text-gray-500 hover:text-gray-700 ant-icon-size"
            />
          </Tooltip>
        </span>
      </Space>
    ),
  },
];

type TeamUsersUpdateProps = {};

const TeamUsersUpdate: React.FC<TeamUsersUpdateProps> = () => {
  const selectedTeamIndex = useAppSelector(selectedTeamId);
  const teams = useAppSelector(allTeams);

  const teamUsers = teams.teams
    .find((t) => t.team_id === selectedTeamIndex)
    ?.users?.map((u) => ({ ...u, key: u.user_profile_id }));

  const deleteUserFromTeam = (id: number) => {};

  if (!teamUsers) {
    return <div>No User Assigned to team yet.</div>;
  }

  return (
    <div>
      <Table columns={getColumns(deleteUserFromTeam)} dataSource={teamUsers} />
    </div>
  );
};

export default TeamUsersUpdate;
