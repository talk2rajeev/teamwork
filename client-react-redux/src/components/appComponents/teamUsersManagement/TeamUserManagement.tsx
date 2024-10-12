import react, { useState, useEffect } from 'react';
import { Button, Tooltip, Radio, RadioChangeEvent } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import { getAllUsersAsync } from '../../../slices/users/userSlice';
import { selectedTeamId, allTeams } from '../../../slices/team/teamSlice';
import * as Types from '../../../utils/types/types';
import TeamUsers from './teamUsers/TeamUsers';
import { PlusOutlined } from '@ant-design/icons';
import UserSearchDropdown from '../../widgets/userSearchDropdown/UserSearchDropdown';

type TeamUserManagementProps = {};

const TeamUserManagement: React.FC<TeamUserManagementProps> = () => {
  const dispatch = useAppDispatch();
  const [showAddUserInput, setShowAddUserInput] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Types.UserType | null>();
  const [roleValue, setRoleValue] = useState<number>(2);

  const selectedTeamIndex = useAppSelector(selectedTeamId);
  const teams = useAppSelector(allTeams);

  const team = teams.teams.find((t) => t.team_id === selectedTeamIndex);
  const teamUsers = team?.users?.map((u) => ({ ...u, key: u.user_profile_id }));
  const teamUsersIds = team?.users?.map((u) => u.user_profile_id) || [];

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  const showAddUserInputFiled = () => {
    setShowAddUserInput(true);
  };

  const cancelAddUser = () => {
    setShowAddUserInput(false);
    setSelectedUser(null);
  };

  const onUserRoleSelection = (e: RadioChangeEvent) => {
    // RoleId: 1 = Admin
    // RoleId: 1 = Developer
    setRoleValue(e.target.value);
  };

  const deleteUserFromTeam = (
    user: Types.TeamUser,
    selectedTeamIndex: number
  ) => {
    console.log(
      'delete >  userId: ',
      user.user_profile_id,
      'treamId: ',
      selectedTeamIndex
    );
  };

  const onUserSelect = (user: Types.UserType) => {
    setSelectedUser(user);
  };

  const addUserToTeam = () => {
    const reqPayload = {
      teamId: selectedTeamIndex,
      profileId: selectedUser?.profileId,
      roleId: roleValue,
    };
    console.log(reqPayload);
  };

  return (
    <div>
      <h3 className="text-sm font-bold mt-2 pt-2">Manage team Users</h3>
      <div className="pt-3 mb-2">
        {showAddUserInput ? (
          <div className="grid grid-flow-col auto-cols-max gap-x-4 py-4 px-2 bg-orange-50">
            <UserSearchDropdown
              onUserSelect={onUserSelect}
              placeholder="Search user to add in the team"
              excludedUsers={teamUsersIds}
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
                  onClick={addUserToTeam}
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
