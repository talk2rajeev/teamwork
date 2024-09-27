import react, { useState, useEffect } from 'react';
import { Button, Tooltip, Select, Radio, RadioChangeEvent } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import {
  searchUsersAsync,
  allUsers,
  getAllUsersAsync,
} from '../../../slices/users/userSlice';
import { selectedTeamId, allTeams } from '../../../slices/team/teamSlice';
import * as Types from '../../../utils/types/types';
import { useDebounce } from '../../../hooks/debounce/debounce';
import TeamUsers from './teamUsers/TeamUsers';
import { PlusOutlined } from '@ant-design/icons';

type TeamUserManagementProps = {};

const TeamUserManagement: React.FC<TeamUserManagementProps> = () => {
  const dispatch = useAppDispatch();
  const [showAddUserInput, setShowAddUserInput] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Types.UserType | null>();
  const [userSearchPattern, setUserSearchPattern] = useState<string>('');
  const [roleValue, setRoleValue] = useState<number>(2);
  const users = useAppSelector(allUsers);

  const selectedTeamIndex = useAppSelector(selectedTeamId);
  const teams = useAppSelector(allTeams);

  const team = teams.teams.find((t) => t.team_id === selectedTeamIndex);
  const teamUsers = team?.users?.map((u) => ({ ...u, key: u.user_profile_id }));
  const teamUsersIds = team?.users?.map((u) => u.user_profile_id) || [];

  const debouncedUserSearchString = useDebounce(userSearchPattern, 500);

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  useEffect(() => {
    if (debouncedUserSearchString) {
      dispatch(searchUsersAsync(debouncedUserSearchString));
    }
  }, [debouncedUserSearchString]);

  const showAddUserInputFiled = () => {
    setShowAddUserInput(true);
  };

  const cancelAddUser = () => {
    setShowAddUserInput(false);
    setSelectedUser(null);
  };

  const onChange = (value: number) => {
    const user = users.users.find((u) => u.profileId === value);
    setSelectedUser(user);
    console.log(`onChange ${value} `, 'selectedUser', user);
  };

  const onUserSearch = (value: string) => {
    console.log('onUserSearch ', value);
    if (value && value.length >= 2) {
      setUserSearchPattern(value);
    }
  };

  const onUserRoleSelection = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRoleValue(e.target.value);
  };

  const userOptions = users.users
    .map((u) => ({
      value: u.profileId,
      label: `${u.fname} ${u.lname}`,
    }))
    .filter((u) => !teamUsersIds?.includes(u.value));

  const deleteUserFromTeam = (user: Types.TeamUser) => {
    console.log('delete user ', user);
  };

  return (
    <div>
      <div className="pt-3 mb-2">
        {showAddUserInput ? (
          <div className="grid grid-flow-col auto-cols-max gap-x-4 py-4 px-2 bg-orange-50">
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
            <Radio.Group
              className="v-center"
              onChange={onUserRoleSelection}
              value={roleValue}
            >
              <Radio value={1}>Admin</Radio>
              <Radio value={2}>Developer</Radio>
            </Radio.Group>
            <div>
              <Tooltip title="Add user to Team" placement="top">
                <Button
                  type="primary"
                  size="middle"
                  disabled={!selectedUser}
                  className="mr-2"
                >
                  Add User
                </Button>
              </Tooltip>
              <Button type="default" size="middle" onClick={cancelAddUser}>
                Cancel
              </Button>
            </div>
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
      <TeamUsers deleteUser={deleteUserFromTeam} teamUsers={teamUsers} />
    </div>
  );
};

export default TeamUserManagement;
