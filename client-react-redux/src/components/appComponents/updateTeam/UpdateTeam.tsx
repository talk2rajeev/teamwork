import react, { useState } from 'react';
import { Modal } from 'antd';
import TeamUserManagement from '../teamUsersManagement/TeamUserManagement';
import { IoMdCreate } from 'react-icons/io';
import * as Types from '../../../utils/types/types';
import TeamNameForm from '../../widgets/teamNameForm/TeamNameForm';

type UpdateTeamProps = {
  teamState: Types.TeamState;
  showModal: boolean;
  handleCancel: () => void;
  updateTeamName: (teamId: number, teamName: string) => void;
};
type User = { profileId: number; fname: string; lname: string };

const UpdateTeam: React.FC<UpdateTeamProps> = ({
  teamState,
  showModal,
  handleCancel,
  updateTeamName,
}) => {
  const teams = teamState.allTeams;
  const selectedTeamIndex = teamState.selectedTeamId;
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
    disableTeamEdit();
    handleCancel();
  };

  const updateTeam = (teamName: string) => {
    updateTeamName(selectedTeamIndex, teamName);
  };

  return (
    <div className="user-story-container bg-white p-2 min-h-96 grid grid-cols-1 content-between">
      <Modal
        title="Team Management"
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
                    <div className="grid grid-flow-col auto-cols-max gap-4">
                      <span>Team Name:</span>
                      <span>{t.team_name}</span>
                    </div>
                    <IoMdCreate
                      size="16"
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={enableTeamNameEdit}
                    />
                  </div>
                ) : (
                  <div className="p-2 grid grid-cols-12 auto-cols-max justify-between gap-1">
                    <div className="col-span-10">
                      <TeamNameForm
                        defaultValue={t.team_name}
                        onSubmit={updateTeam}
                        onCancel={disableTeamEdit}
                        type="Create"
                      />
                    </div>
                  </div>
                )}
                <TeamUserManagement />
              </div>
            );
          })}
      </Modal>
    </div>
  );
};

export default UpdateTeam;
