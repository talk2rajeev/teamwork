import react, { useState, useEffect, useReducer } from 'react';
import { Button, Modal, Input, Tooltip, Select } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import TeamUserManagement from '../teamUsersManagement/TeamUserManagement';
import {
  getAllTeams,
  getTeamsWithUserByTeamId,
  allTeams,
  selectedTeamId,
  updateTeamState,
  updateTeamNameAsync,
  idleTeamNameUpdateStatus,
} from '../../../slices/team/teamSlice';
import { IoMdCreate } from 'react-icons/io';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

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

  const enableTeamNameEdit = () => {
    setTeamNameEditMode(true);
  };

  const disableTeamEdit = () => {
    setTeamNameEditMode(false);
  };

  const onCancel = () => {
    enableTeamNameEdit();
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
      <Modal
        title="Team"
        open={showModal}
        onCancel={onCancel}
        width={800}
        footer={null}
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
                      onClick={enableTeamNameEdit}
                    />
                  </div>
                ) : (
                  <div className="p-2 grid grid-cols-12 auto-cols-max justify-between gap-1">
                    <div className="col-span-8">
                      <label>Team Name</label>
                      <Input
                        placeholder="Team name"
                        defaultValue={t.team_name}
                        onChange={onTeamNameChange}
                        size="middle"
                      />
                    </div>
                    <div className="flex items-end col-span-4">
                      {/* <Button
                        type="primary"
                        loading={updateTeamStateObject.status === 'loading'}
                        iconPosition="start"
                        onClick={updateTeamName}
                      >
                        Update
                      </Button> */}
                      <Tooltip title="Update Team name" placement="top">
                        <Button
                          type="primary"
                          icon={<CheckOutlined style={{ color: '#FFF' }} />}
                          size="middle"
                          onClick={updateTeamName}
                        />
                      </Tooltip>
                      &nbsp;
                      <Tooltip title="Cancel" placement="top">
                        <Button
                          icon={<CloseOutlined color="#0099ff" />}
                          onClick={disableTeamEdit}
                        />
                      </Tooltip>
                    </div>
                  </div>
                )}

                <div className="p-2 border-b-2 grid grid-flow-col auto-cols-max gap-4 mt-1 mb-4">
                  <span>Created By: </span>
                  <span>
                    {t.created_by_fname} {t.created_by_lname}
                  </span>
                </div>

                <TeamUserManagement />
              </div>
            );
          })}
      </Modal>
    </div>
  );
};

export default UpdateTeam;
