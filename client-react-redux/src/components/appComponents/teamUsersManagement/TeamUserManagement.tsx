import react, { useState, useEffect } from 'react';
import { Button, Tooltip, Radio, RadioChangeEvent } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import { getAllUsersAsync } from '../../../slices/users/userSlice';
import {
  teamReducer,
  assignUserRoleInTeamAsync,
  deleteUserFromTeamAsync,
  resetUpdateTeam,
  resetDeleteTeamUser,
} from '../../../slices/team/teamSlice';
import * as Types from '../../../utils/types/types';
import TeamUsers from './teamUsers/TeamUsers';
import { PlusOutlined } from '@ant-design/icons';
import UserSearchDropdown from '../../widgets/userSearchDropdown/UserSearchDropdown';
import { showNotification } from '../../../slices/notificationSlice/notificationSlice';

type TeamUserManagementProps = {
  canUserUpdate: boolean;
};

const TeamUserManagement: React.FC<TeamUserManagementProps> = ({
  canUserUpdate,
}) => {
  const dispatch = useAppDispatch();
  const [showAddUserInput, setShowAddUserInput] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Types.UserType | null>();
  const [roleValue, setRoleValue] = useState<number>(2);

  const teamState = useAppSelector(teamReducer);
  const selectedTeamIndex = teamState.selectedTeamId;
  const teams = teamState.allTeams;

  const team = teams.teams.find((t) => t.team_id === selectedTeamIndex);
  const teamUsers = team?.users?.map((u) => ({ ...u, key: u.user_profile_id }));
  const teamUsersIds = team?.users?.map((u) => u.user_profile_id) || [];

  useEffect(() => {
    if (
      (teamState.updateTeam.message &&
        teamState.updateTeam.status === 'success') ||
      teamState.updateTeam.status === 'failed'
    ) {
      dispatch(
        showNotification({
          type: teamState.updateTeam.status === 'success' ? 'success' : 'error',
          message: teamState.updateTeam.message ?? '',
        })
      );
    }
    return () => {
      dispatch(resetUpdateTeam());
    };
  }, [teamState.updateTeam]);

  useEffect(() => {
    if (
      (teamState.deleteTeamUser.message &&
        teamState.deleteTeamUser.status === 'success') ||
      teamState.deleteTeamUser.status === 'failed'
    ) {
      dispatch(
        showNotification({
          type:
            teamState.deleteTeamUser.status === 'success' ? 'success' : 'error',
          message: teamState.deleteTeamUser.message ?? '',
        })
      );
    }
    return () => {
      dispatch(resetDeleteTeamUser());
    };
  }, [teamState.deleteTeamUser]);

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
    setRoleValue(e.target.value);
  };

  const deleteUserFromTeam = (
    user: Types.TeamUser,
    selectedTeamIndex: number
  ) => {
    dispatch(
      deleteUserFromTeamAsync({
        teamId: selectedTeamIndex,
        profileId: user.user_profile_id,
      })
    );
  };

  const onUserSelect = (user: Types.UserType) => {
    setSelectedUser(user);
  };

  const addUserToTeam = () => {
    if (selectedUser?.profileId) {
      const reqPayload = {
        teamId: selectedTeamIndex,
        profileId: selectedUser.profileId,
        roleId: roleValue,
      };
      if (reqPayload.profileId) {
        dispatch(assignUserRoleInTeamAsync(reqPayload));
        setShowAddUserInput(false);
      }
    }
  };

  return (
    <div>
      <h3 className="text-sm font-bold mt-2 pt-2">Manage team Users</h3>
      <div className="pt-3 mb-2">
        {showAddUserInput && canUserUpdate && (
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
        )}
        {!showAddUserInput && canUserUpdate && (
          <div>
            <Tooltip title="Add user to team" placement="right">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="middle"
                onClick={showAddUserInputFiled}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <TeamUsers
        deleteUser={deleteUserFromTeam}
        teamUsers={teamUsers}
        selectedTeamIndex={selectedTeamIndex}
        isAdmin={canUserUpdate}
      />
    </div>
  );
};

export default TeamUserManagement;
