import react from 'react';
import { Table, Tag, TableProps } from 'antd';
import * as Types from '../../../../utils/types/types';
import TeamDeleteButton from '../teamDeleteButton/TeamDeleteButton';

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
      <TeamDeleteButton deleteUser={deleteUser} record={record} />
    ),
  },
];

interface TeamUsersProps {
  deleteUser: (user: Types.TeamUser, selectedTeamIndex: number) => void;
  teamUsers?: Array<Types.TeamUser>;
  selectedTeamIndex: number;
}

const TeamUsers: React.FC<TeamUsersProps> = ({
  deleteUser,
  teamUsers,
  selectedTeamIndex,
}) => {
  const removeUser = (user: Types.TeamUser) => {
    deleteUser(user, selectedTeamIndex);
  };

  if (!teamUsers) {
    return <div>No User Assigned to team yet.</div>;
  }

  return <Table columns={getColumns(removeUser)} dataSource={teamUsers} />;
};

export default TeamUsers;
