import react, { useState, useEffect, useReducer } from 'react';
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
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import { selectedTeamId, allTeams } from '../../../slices/team/teamSlice';
import { searchUsersAsync, allUsers } from '../../../slices/users/userSlice';
import * as Types from '../../../utils/types/types';
import { useDebounce } from '../../../hooks/debounce/debounce';
import {
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const style: React.CSSProperties = {
  width: '300vw',
  height: '300vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const getColumns = (
  deleteUserFromTeam: (id: number) => void
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
      <DeleteButton deleteUser={deleteUserFromTeam} record={record} />
    ),
    // (
    //   <Space size="middle">
    //     <span onClick={() => deleteUserFromTeam(record.user_profile_id)}>
    //       <Tooltip title="Remove user from team." placement="top">
    //         <Popconfirm
    //           title="Confirm Delete."
    //           open={open}
    //           onConfirm={handleOk}
    //           onCancel={handleCancel}
    //         >
    //           <DeleteOutlined
    //             size={30}
    //             className="cursor-pointer text-gray-500 hover:text-gray-700 ant-icon-size"
    //           />
    //         </Popconfirm>
    //       </Tooltip>
    //     </span>
    //   </Space>
    // ),
  },
];

type TeamUserManagementProps = {};

const TeamUserManagement: React.FC<TeamUserManagementProps> = () => {
  const dispatch = useAppDispatch();
  const [showAddUserInput, setShowAddUserInput] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Types.UserType | null>();
  const [userSearchPattern, setUserSearchPattern] = useState<string>('');
  const selectedTeamIndex = useAppSelector(selectedTeamId);
  const teams = useAppSelector(allTeams);
  const users = useAppSelector(allUsers);

  console.log('users ', users);

  const debouncedUserSearchString = useDebounce(userSearchPattern, 500);

  useEffect(() => {
    if (debouncedUserSearchString) {
      dispatch(searchUsersAsync(debouncedUserSearchString));
    }
  }, [debouncedUserSearchString]);

  useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  const showAddUserInputFiled = () => {
    setShowAddUserInput(true);
  };

  const onChange = (value: number) => {
    console.log(`selected ${value}`);
    console.log(typeof value);
    const selecteduser = users.users.find((u) => u.profileId === value);
    setSelectedUser(selecteduser);
  };

  const unSelectUser = () => {
    setSelectedUser(null);
  };

  const onUserSearch = (value: string) => {
    if (value && value.length >= 2) {
      setUserSearchPattern(value);
    }
  };

  const userOptions = users.users.map((u) => ({
    value: u.profileId,
    label: `${u.fname} ${u.lname}`,
  }));

  const teamUsers = teams.teams
    .find((t) => t.team_id === selectedTeamIndex)
    ?.users?.map((u) => ({ ...u, key: u.user_profile_id }));

  const deleteUserFromTeam = (id: number) => {
    console.log('delete user ', id);
  };

  console.log('selectedUsr ', selectedUser);

  if (!teamUsers) {
    return <div>No User Assigned to team yet.</div>;
  }

  return (
    <div>
      <div className="pt-3 mb-2">
        {showAddUserInput ? (
          <div>
            <Select
              onChange={onChange}
              onSearch={onUserSearch}
              showSearch
              loading={users.status === 'loading'}
              style={{ width: 200 }}
              placeholder="Search user to add in the team"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={userOptions}
            />
            &nbsp;
            {selectedUser?.profileId ?? (
              <>
                <Tooltip title="Addd user" placement="top">
                  <Button
                    type="primary"
                    icon={<CheckOutlined style={{ color: '#FFF' }} />}
                    size="middle"
                  />
                </Tooltip>
                &nbsp;
                <Tooltip title="Cancel" placement="top">
                  <Button onClick={unSelectUser} icon={<CloseOutlined />} />
                </Tooltip>
              </>
            )}
          </div>
        ) : (
          <div>
            <Tooltip title="Add user to team" placement="right">
              <PlusOutlined
                size={38}
                className="cursor-pointer text-gray-500 hover:text-gray-700 rounded-full border-2 border-slate-500 ant-icon-size"
                onClick={showAddUserInputFiled}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <Table columns={getColumns(deleteUserFromTeam)} dataSource={teamUsers} />
    </div>
  );
};

export default TeamUserManagement;

const DeleteButton = ({
  record,
  deleteUser,
}: {
  record: Types.TeamUser;
  deleteUser: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleOk = () => {
    setOpen((c) => false);
  };
  const handleCancel = () => {
    setOpen((c) => false);
  };
  const deleteUserEvent = (id: number) => {
    setOpen((c) => true);
    deleteUser(id);
  };

  return (
    <Space size="middle">
      <Tooltip title="Remove user from team." placement="top">
        <Popconfirm
          title="Confirm Delete."
          open={open}
          onConfirm={handleOk}
          onCancel={handleCancel}
        >
          <span
            data-test="AAAAAA"
            data-id={record.user_profile_id}
            onClick={() => deleteUserEvent(record.user_profile_id)}
          >
            <DeleteOutlined
              size={30}
              className="cursor-pointer text-gray-500 hover:text-gray-700 ant-icon-size"
              data-test="AAAAAA"
              data-id={record.user_profile_id}
            />
          </span>
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};
