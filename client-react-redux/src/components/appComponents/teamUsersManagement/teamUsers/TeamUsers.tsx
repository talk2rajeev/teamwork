import react, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  Space,
  Tag,
  TableProps,
  Tooltip,
  Select,
  Popconfirm,
} from 'antd';
import { selectedTeamId, allTeams } from '../../../../slices/team/teamSlice';
import { useAppSelector, useAppDispatch } from '../../../../appStore/hooks';
import * as Types from '../../../../utils/types/types';
import DeleteButton from '../teamDeleteButton/TeamDeleteButton';

const getColumns = (
  deleteUser: (user: Types.TeamUser) => void
): TableProps<Types.TeamUser>['columns'] => [
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
      <DeleteButton deleteUser={deleteUser} record={record} />
    ),
  },
];

interface TeamUsersProps {
  deleteUser: (user: Types.TeamUser) => void;
}

const TeamUsers: React.FC<TeamUsersProps> = ({ deleteUser }) => {
  const selectedTeamIndex = useAppSelector(selectedTeamId);
  const teams = useAppSelector(allTeams);

  const teamUsers = teams.teams
    .find((t) => t.team_id === selectedTeamIndex)
    ?.users?.map((u) => ({ ...u, key: u.user_profile_id }));

  if (!teamUsers) {
    return <div>No User Assigned to team yet.</div>;
  }

  return <Table columns={getColumns(deleteUser)} dataSource={teamUsers} />;
};

export default TeamUsers;
