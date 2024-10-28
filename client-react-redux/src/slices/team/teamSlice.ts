import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import * as fetcher from '../../services/fetcher/fetcher';
import * as Types from '../../utils/types/types';

const initialState: Types.TeamState = {
  TeamWithUser: {
    status: 'idle',
    TeamWithUsers: [],
  },
  allTeams: {
    status: 'idle',
    teams: [],
  },
  selectedTeamId: -1,
  teamCreated: undefined,
  updateTeam: {
    status: 'idle',
    message: undefined,
  },
  deleteTeamUser: {
    status: 'idle',
    message: undefined,
  },
  todo: '',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
type EmptyReqPayloadType = {};
type ReqPayloadType = { teamName: string; createdById: number };

export const createTeamAsync = createAsyncThunk<
  Types.GenericResponseType<undefined>,
  ReqPayloadType
>('team/createTeam', async (reqPayload: ReqPayloadType, thunkAPI) => {
  const response = await fetcher.post<Types.GenericResponseType<undefined>>(
    '/team/createTeam',
    { teamNames: reqPayload.teamName, createdById: reqPayload.createdById }
  );
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const getAllTeams = createAsyncThunk<
  Types.GenericResponseType<Types.TeamType[]>
>('/team/getAllTeams', async () => {
  const response =
    await fetcher.get<Types.GenericResponseType<Types.TeamType[]>>(
      '/team/getAllTeams'
    );
  // The value we return becomes the `fulfilled` action payload

  return response;
});

type TeamWithUserByIdReturnType = {
  teamId: number;
  users: Array<Types.TeamUser>;
};
export const getTeamsWithUserByTeamId = createAsyncThunk<
  TeamWithUserByIdReturnType,
  string
>('/team/getTeamWithUsersById', async (teamId: string, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const response = await fetcher.get<Types.GenericResponseType<Types.Team[]>>(
    `/team/getTeamWithUsersById/${teamId}`
  );

  const returnData: TeamWithUserByIdReturnType = {
    teamId: Number(teamId),
    users: [],
  };
  if (response.data.length && response.data[0].users) {
    returnData.users = response.data[0].users;
  }

  return returnData;
});

export const getTeamsWithUsersAsync = createAsyncThunk<
  Array<Types.TeamWithUserInterface>
>('/team/getTeamsWithUsers', async () => {
  const response = await fetcher.get<Array<Types.TeamWithUserInterface>>(
    '/team/getAllTeamsWithUsers'
  );
  // The value we return becomes the `fulfilled` action payload
  return response;
});

type UpdateTeamReqPayload = { teamId: number; teamName: string };
export const updateTeamNameAsync = createAsyncThunk<
  Types.GenericResponseType<Types.Team>,
  UpdateTeamReqPayload
>('/team/updateTeamName', async (teamObj: UpdateTeamReqPayload, thunkAPI) => {
  const reqPayload = { teamName: teamObj.teamName };
  const response = await fetcher.put<Types.GenericResponseType<Types.Team>>(
    `/team/updateTeam/${teamObj.teamId}`,
    reqPayload
  );
  thunkAPI.dispatch(setTeamName(teamObj));
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const assignUserRoleInTeamAsync = createAsyncThunk<
  Types.GenericResponseType<undefined>,
  Types.AssignTeamUserReqPayload
>(
  '/team/assignUserRoleInTeam',
  async (reqPayload: Types.AssignTeamUserReqPayload, thunkAPI) => {
    const response = await fetcher.post<Types.GenericResponseType<undefined>>(
      `/team/assignUserRoleInTeam`,
      reqPayload
    );
    if (response.success)
      thunkAPI.dispatch(getTeamsWithUserByTeamId(reqPayload.teamId.toString()));

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const deleteUserFromTeamAsync = createAsyncThunk<
  Types.GenericResponseType<undefined>,
  Types.DeleteTeamUserReqPayload
>(
  '/team/deleteUserFromTeam',
  async (reqPayload: { teamId: number; profileId: number }, thunkAPI) => {
    const response = await fetcher.remove<Types.GenericResponseType<undefined>>(
      `/team/deleteUserFromTeam`,
      reqPayload
    );

    if (response.success)
      thunkAPI.dispatch(getTeamsWithUserByTeamId(reqPayload.teamId.toString()));

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserToTeam: (
      state,
      action: PayloadAction<Types.TeamWithUserInterface>
    ) => {
      state.allTeams.teams = state.allTeams.teams.map((t) => {
        if (t.team_id === action.payload?.team_id) {
          return {
            ...t,
            users: action.payload?.users,
          };
        }
        return t;
      });
      state.selectedTeamId = action.payload.team_id || -1;
    },
    setTeamName: (
      state,
      action: PayloadAction<{ teamId: number; teamName: string }>
    ) => {
      // teamName updated > updated teamName in reducer instead of fetching list agian
      state.allTeams.teams = state.allTeams.teams.map((t) => {
        if (t.team_id === action.payload.teamId)
          return { ...t, team_name: action.payload.teamName };
        return t;
      });
    },
    resetTeam: (state) => {
      state.selectedTeamId = -1;
    },
    resetCreateTeamState: (state) => {
      state.teamCreated = undefined;
    },
    resetUpdateTeam: (state) => {
      state.updateTeam.status = 'idle';
      state.updateTeam.message = undefined;
    },
    resetDeleteTeamUser: (state) => {
      state.deleteTeamUser.status = 'idle';
      state.deleteTeamUser.message = undefined;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createTeamAsync.pending, (state) => {
        state.teamCreated = {
          type: 'info',
          status: 'loading',
          error: false,
        };
      })
      .addCase(createTeamAsync.fulfilled, (state, action) => {
        state.teamCreated = {
          type: 'success',
          status: 'idle',
          error: false,
          message: action.payload.message,
        };
      })
      .addCase(
        createTeamAsync.rejected,
        (state, action: ReturnType<typeof createTeamAsync.rejected>) => {
          state.teamCreated = {
            type: 'error',
            status: 'failed',
            error: true,
            message: action.error.message,
          };
        }
      )

      .addCase(getAllTeams.pending, (state) => {
        state.TeamWithUser.status = 'loading';
        state.TeamWithUser.TeamWithUsers = [];
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.TeamWithUser.status = 'idle';
        state.allTeams.teams = action.payload.data.map((t) => ({
          team_id: t.teamId,
          team_name: t.teamName,
          created_by_profile_id: t.createdByProfileId,
          created_by_fname: t.createdByFname,
          created_by_lname: t.createdByLname,
          created_by: `${t.createdByFname} ${t.createdByLname}`,
          users: [],
        }));
      })
      .addCase(getAllTeams.rejected, (state) => {
        state.TeamWithUser.status = 'failed';
        state.allTeams.teams = [];
      })

      .addCase(getTeamsWithUsersAsync.pending, (state) => {
        state.TeamWithUser.status = 'loading';
        state.TeamWithUser.TeamWithUsers = [];
      })
      .addCase(getTeamsWithUsersAsync.fulfilled, (state, action) => {
        state.TeamWithUser.status = 'idle';
        state.TeamWithUser.TeamWithUsers = action.payload;
      })
      .addCase(getTeamsWithUsersAsync.rejected, (state) => {
        state.TeamWithUser.status = 'failed';
        state.TeamWithUser.TeamWithUsers = [];
      })

      .addCase(getTeamsWithUserByTeamId.pending, (state) => {
        state.allTeams.status = 'loading';
      })
      .addCase(getTeamsWithUserByTeamId.fulfilled, (state, action) => {
        state.allTeams.status = 'idle';
        state.allTeams.teams = state.allTeams.teams.map((t) =>
          t.team_id === action.payload.teamId
            ? { ...t, users: action.payload.users }
            : { ...t }
        );
        state.selectedTeamId = action.payload.teamId;
      })
      .addCase(getTeamsWithUserByTeamId.rejected, (state) => {
        console.log('getTeamsWithUserByTeamId rejected');
        state.allTeams.status = 'failed';
      })

      .addCase(updateTeamNameAsync.pending, (state) => {
        state.updateTeam.status = 'loading';
      })
      .addCase(updateTeamNameAsync.fulfilled, (state, action) => {
        state.updateTeam.status = 'success';
        state.updateTeam.message = action.payload.message;
      })
      .addCase(updateTeamNameAsync.rejected, (state) => {
        state.allTeams.status = 'failed';
        state.updateTeam.message = 'Failed to update Team Name!';
      })

      .addCase(assignUserRoleInTeamAsync.pending, (state) => {
        state.updateTeam.status = 'loading';
      })
      .addCase(assignUserRoleInTeamAsync.fulfilled, (state, action) => {
        state.updateTeam.status = action.payload.success ? 'success' : 'failed';
        state.updateTeam.message = action.payload.message;
      })
      .addCase(assignUserRoleInTeamAsync.rejected, (state, action) => {
        state.updateTeam.status = 'failed';
        state.updateTeam.message = action.error.message;
      })

      .addCase(deleteUserFromTeamAsync.pending, (state) => {
        state.deleteTeamUser.status = 'loading';
      })
      .addCase(deleteUserFromTeamAsync.fulfilled, (state, action) => {
        state.deleteTeamUser.status = action.payload.success
          ? 'success'
          : 'failed';
        state.deleteTeamUser.message = action.payload.message;
      })
      .addCase(deleteUserFromTeamAsync.rejected, (state, action) => {
        state.deleteTeamUser.status = 'failed';
        state.deleteTeamUser.message = action.error.message;
      });
  },
});

export const {
  setUserToTeam,
  setTeamName,
  resetTeam,
  resetCreateTeamState,
  resetUpdateTeam,
  resetDeleteTeamUser,
} = teamSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const teamWithUsers = (state: RootState) =>
  state.team.TeamWithUser.TeamWithUsers;
export const allTeams = (state: RootState) => state.team.allTeams;
export const selectedTeamId = (state: RootState) => state.team.selectedTeamId;
export const updateTeamState = (state: RootState) => state.team.updateTeam;
export const teamCreated = (state: RootState) => state.team.teamCreated;
export const teamReducer = (state: RootState) => state.team;

export default teamSlice.reducer;
