import React, { useEffect, useState } from 'react';
import { Space, Table, Tooltip, Button, TableProps } from 'antd';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import UpdateTeam from '../../components/appComponents/updateTeam/UpdateTeam';
import {
  createTeamAsync,
  getAllTeams,
  getTeamsWithUserByTeamId,
  teamReducer,
  updateTeamNameAsync,
  resetTeam,
  resetCreateTeamState,
} from '../../slices/team/teamSlice';
import * as Types from '../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';
import { PlusOutlined } from '@ant-design/icons';
import TeamNameForm from '../../components/widgets/teamNameForm/TeamNameForm';
import { AuthUtil } from '../../utils/auth/auth';
import { showNotification } from '../../slices/notificationSlice/notificationSlice';
import { getTeamColumns } from '../../components/appComponents/teamColumn/TeamColumn';

const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const teamState = useAppSelector(teamReducer);
  const teams = teamState.allTeams; //  useAppSelector(allTeams);
  const selectedTeamIndex = teamState.selectedTeamId; // useAppSelector(selectedTeamId);
  const updateTeamStateObject = teamState.updateTeam; // useAppSelector(updateTeamState);
  const teamCreationResponse = teamState.teamCreated; // useAppSelector(teamCreated);

  const [openTeamUpdateState, setOpenTeamUpdateState] =
    useState<boolean>(false);
  const [openCreateTeamState, setOpenCreateTeamState] =
    useState<boolean>(false);
  const [actionType, setActionType] = useState<'view' | 'update'>();

  const [teamName, setTeamName] = useState<string>('');

  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  useEffect(() => {
    if (teamCreationResponse?.message) {
      dispatch(
        showNotification({
          type: teamCreationResponse.type,
          title: teamCreationResponse.type,
          message: teamCreationResponse.message,
        })
      );
    }
    return () => {
      if (teamCreationResponse) dispatch(resetCreateTeamState());
    };
  }, [teamCreationResponse]);

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  useEffect(() => {
    if (updateTeamStateObject.status === 'success') {
      dispatch(
        showNotification({
          type: 'success',
          title: 'Success',
          message: updateTeamStateObject.message || '',
        })
      );
    }
    if (updateTeamStateObject.status === 'failed') {
      dispatch(
        showNotification({
          type: 'error',
          title: 'Failed!',
          message: updateTeamStateObject.message || '',
        })
      );
    }
  }, [updateTeamStateObject.status]);

  const showModal = () => {
    setOpenTeamUpdateState(true);
  };

  const handleOk = () => {
    closeEditModal();
  };

  const handleCancel = () => {
    closeEditModal();
  };

  const closeEditModal = () => {
    dispatch(resetTeam());
    setOpenTeamUpdateState(false);
  };

  const viewTeamDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    console.log(dataset);
    if (dataset.teamid) {
      setActionType('view');
      dispatch(getTeamsWithUserByTeamId(dataset.teamid));
      showModal();
    }
  };

  const initiateUpdateTeam = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const targetElement = event.currentTarget as HTMLSpanElement;
    const dataset = targetElement.dataset;
    if (dataset.teamid) {
      setActionType('update');
      dispatch(getTeamsWithUserByTeamId(dataset.teamid));
      showModal();
    }
  };

  const onTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const showCreateTeamSection = () => {
    setOpenCreateTeamState(true);
  };

  const createTeam = (teamName: string) => {
    if (userDetail?.profileId) {
      dispatch(
        createTeamAsync({ teamName, createdById: userDetail?.profileId })
      );
      setOpenCreateTeamState(false);
    }
  };

  const hideCreateTeamSection = () => {
    setOpenCreateTeamState(false);
  };

  const updateTeamName = (teamId: number, teamName: string) => {
    dispatch(
      updateTeamNameAsync({
        teamId,
        teamName,
      })
    );
  };

  const disabled = actionType === 'view';

  const data = teams.teams.map((t) => ({ ...t, key: t.team_id }));

  return (
    <div>
      {isAdmin && !openCreateTeamState ? (
        <div className="mt-3 mb-3">
          <Tooltip title="Create new team" placement="right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={showCreateTeamSection}
            />
          </Tooltip>
        </div>
      ) : (
        <div className="mt-3 mb-4">
          <div className="pl-4 pt-2 pb-3 w-2/5 bg-orange-50 border-orange-100 border-1">
            <TeamNameForm
              onSubmit={createTeam}
              onCancel={hideCreateTeamSection}
              type="Create"
            />
          </div>
        </div>
      )}
      {teams.status === 'loading' && teams.teams.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <Table
          columns={getTeamColumns(viewTeamDetail, initiateUpdateTeam)}
          dataSource={data}
        />
      )}
      <UpdateTeam
        teamState={teamState}
        showModal={openTeamUpdateState}
        handleCancel={handleCancel}
        updateTeamName={updateTeamName}
      />
    </div>
  );
};

export default Team;
