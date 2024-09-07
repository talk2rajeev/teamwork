import react, { useState, useEffect, useReducer } from 'react';
import { Button, Modal, Input, Tooltip, AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import TeamUsersUpdate from '../teamUsersUpdate/TeamUsersUpdate';
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
import { PlusOutlined } from '@ant-design/icons';

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
  const [showAddUserInput, setShowAddUserInput] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<{ id: number; value: string }>>([
    { id: 1, value: 'rajeev' },
    { id: 2, value: 'binomtvr' },
  ]);

  const toggleTeamNameEditMode = () => {
    setTeamNameEditMode(!teamNameEditMode);
  };

  const onCancel = () => {
    toggleTeamNameEditMode();
    setShowAddUserInput(false);
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

  const showAddUserInputFiled = () => {
    setShowAddUserInput(true);
  };

  const onSelect = (data: any) => {
    console.log('onSelect', data);
  };

  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const setAutoOption = (a: any) => {
    console.log(a);
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
                      onClick={toggleTeamNameEditMode}
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
                      <Button
                        type="primary"
                        icon={<PlusOutlined color="#0099ff" />}
                        size="middle"
                      />
                      &nbsp;
                      <Button onClick={toggleTeamNameEditMode}>Cancel</Button>
                    </div>
                  </div>
                )}

                <div className="p-2 border-b-2 grid grid-flow-col auto-cols-max gap-4 mt-1 mb-4">
                  <span>Created By: </span>
                  <span>
                    {t.created_by_fname} {t.created_by_lname}
                  </span>
                </div>

                <div>
                  <div className="pt-3 mb-2">
                    {showAddUserInput ? (
                      <div>
                        <AutoComplete
                          options={options}
                          style={{ width: 200 }}
                          onSelect={onSelect}
                          onSearch={setAutoOption}
                          placeholder="Search User"
                        />
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
                  <TeamUsersUpdate />
                </div>
              </div>
            );
          })}
      </Modal>
    </div>
  );
};

export default UpdateTeam;
