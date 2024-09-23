import { Reducer } from 'react';

type User = { profileId: number; fname: string; lname: string };
export interface TeamUpdateState {
  teamname: string;
  users: Array<User>;
}

export enum TeamUpdateActionTypes {
  TEAM_NAME_UPDATE = 'TEAM_NAME_UPDATE',
  TEAM_USERS_UPDATE = 'TEAM_USERS_UPDATE',
}

export interface UpdateFirstnameAction {
  type: TeamUpdateActionTypes.TEAM_NAME_UPDATE;
  payload: string;
}

export interface UpdateLastnameAction {
  type: TeamUpdateActionTypes.TEAM_USERS_UPDATE;
  payload: User;
}

export type TeamAction = UpdateFirstnameAction | UpdateLastnameAction;

const teamUpdateReducer: Reducer<TeamUpdateState, TeamAction> = (
  state,
  action
) => {
  switch (action.type) {
    case TeamUpdateActionTypes.TEAM_NAME_UPDATE:
      return {
        ...state,
        teamname: action.payload,
      };
    case TeamUpdateActionTypes.TEAM_USERS_UPDATE:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default teamUpdateReducer;
