import react, { useState, useEffect, useReducer } from 'react';
import { Button, Modal, Input, TableProps, notification } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';

import {
  getAllTeams,
  getTeamsWithUserByTeamId,
  allTeams,
  selectedTeamId,
  updateTeamState,
  updateTeamNameAsync,
  idleTeamNameUpdateStatus,
} from '../../../slices/team/teamSlice';
import { IoMdEye, IoMdCreate } from 'react-icons/io';

type UpdateTeamProps = {
  showModal: boolean;
  handleCancel: () => void;
};
type User = { profileId: number; fname: string; lname: string };

const UpdateTeam: React.FC<UpdateTeamProps> = ({ showModal, handleCancel }) => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(allTeams);
  const selectedTeamIndex = useAppSelector(selectedTeamId);
  const updateTeamStateObject = useAppSelector(updateTeamState);
  const [teamNameEditMode, setTeamNameEditMode] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<{
    teamname: string;
    users: Array<User>;
  }>({
    teamname: '',
    users: [],
  });

  const toggleTeamNameEditMode = () => {
    setTeamNameEditMode(!teamNameEditMode);
  };

  const onCancel = () => {
    toggleTeamNameEditMode();
    handleCancel();
  };

  const updateTeamName = () => {
    dispatch(
      updateTeamNameAsync({
        teamId: selectedTeamIndex,
        teamName: teamData.teamname,
      })
    );
  };

  const onTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamData({ ...teamData, teamname: event.target.value });
  };

  return (
    <div className="user-story-container bg-white p-2 min-h-96 grid grid-cols-1 content-between">
      <Modal title="Team" open={showModal} onCancel={onCancel} width={700}>
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
                  <div className="p-2 grid grid-cols-5 auto-cols-max justify-between gap-1">
                    <div className="col-span-4">
                      <label>Team Name</label>
                      <Input
                        placeholder="Team name"
                        defaultValue={t.team_name}
                        onChange={onTeamNameChange}
                        size="middle"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="primary"
                        loading={updateTeamStateObject.status === 'loading'}
                        iconPosition="start"
                        onClick={updateTeamName}
                      >
                        Update
                      </Button>
                      &nbsp;
                      <Button onClick={toggleTeamNameEditMode}>Cancel</Button>
                      {/* {updateTeamStateObject.status === 'loading' ? (
                        <Spinner />
                      ) : (
                        <TiTick
                          size="28"
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={updateTeamName}
                        />
                      )} */}
                    </div>
                  </div>
                )}

                <div className="p-2 border-b-2 grid grid-flow-col auto-cols-max gap-4 mt-5">
                  <span>Created By: </span>
                  <span>
                    {t.created_by_fname} {t.created_by_lname}
                  </span>
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

export default UpdateTeam;
