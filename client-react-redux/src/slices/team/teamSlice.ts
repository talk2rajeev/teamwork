import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import * as fetcher from '../../services/fetcher/fetcher';
import * as Types from '../../utils/types/types';
// import { login, logoutAsyncApi } from './loginAPI';

// type productWithTeam = product & {
//   team: { teamId: number; teamName: string };
// };

type status = 'idle' | 'loading' | 'failed';
type TeamCreated = {
  message?: string;
  error?: boolean;
  errorMessage?: string;
  status: status;
};

export interface TeamState {
  TeamWithUser: {
    status: Types.StatusType;
    TeamWithUsers: Types.TeamWithUserInterface[];
  };
  allTeams: {
    status: Types.StatusType;
    teams: Array<Types.Team>;
  };
  selectedTeamId: number;
  teamCreated?: TeamCreated;
  updateTeam: {
    status: 'idle' | 'loading' | 'failed' | 'success';
    message?: string;
  };
}

const initialState: TeamState = {
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
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createTeamAsync = createAsyncThunk(
  'team/createTeam',
  async (reqPayload: { teamName: string; createdById: number }) => {
    const response = await fetcher.post<Types.CreateResponseType>(
      '/team/createTeam',
      reqPayload
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getAllTeams = createAsyncThunk('/team/getAllTeams', async () => {
  type TeamType = {
    createdByProfileId: number;
    createdByFname: string;
    createdByLname: string;
    teamId: number;
    teamName: string;
  };
  const response = await fetcher.get<Array<TeamType>>('/team/getAllTeams');
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const getTeamsWithUserByTeamId = createAsyncThunk(
  '/team/getTeamWithUsersById',
  async (teamId: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const response = await fetcher.get<Array<Types.TeamWithUserInterface>>(
      `/team/getTeamWithUsersById/${teamId}`
    );
    let users: Types.TeamUser[] = [];
    if (response.length) {
      users = response[0].users;
    } else {
      const selectedTeam = state.team.allTeams.teams.find(
        (t) => t.team_id === Number(teamId)
      );
      if (selectedTeam) users = selectedTeam.users || [];
    }
    return { teamId: Number(teamId), users };
  }
);

export const getTeamsWithUsersAsync = createAsyncThunk(
  '/team/getTeamsWithUsers',
  async () => {
    const response = await fetcher.get<Array<Types.TeamWithUserInterface>>(
      '/team/getAllTeamsWithUsers'
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateTeamNameAsync = createAsyncThunk(
  '/team/updateTeamName',
  async (teamObj: { teamId: number; teamName: string }, thunkAPI) => {
    const reqPayload = { teamName: teamObj.teamName };
    const response = await fetcher.put<{ message: string }>(
      `/team/updateTeam/${teamObj.teamId}`,
      reqPayload
    );
    thunkAPI.dispatch(setTeamName(teamObj));
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const assignUserRoleInTeamAsync = createAsyncThunk(
  '/team/assignUserRoleInTeam',
  async (reqPayload: Types.AssignTeamUserReqPayload, thunkAPI) => {
    const response = await fetcher.post<{ message: string }>(
      `/team/assignUserRoleInTeam}`,
      reqPayload
    );
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
      state.allTeams.teams = state.allTeams.teams.map((t) => {
        if (t.team_id === action.payload.teamId)
          return { ...t, team_name: action.payload.teamName };
        return t;
      });
    },
    idleTeamNameUpdateStatus: (state) => {
      state.updateTeam.status = 'idle';
    },
    resetTeam: (state) => {
      state.selectedTeamId = -1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createTeamAsync.pending, (state) => {
        state.teamCreated = {
          status: 'loading',
          message: undefined,
          error: undefined,
          errorMessage: undefined,
        };
      })
      .addCase(createTeamAsync.fulfilled, (state, action) => {
        state.teamCreated = {
          message:
            action.payload.affectedRows === 1
              ? 'Team created successfully!'
              : 'Team could not be created',
          error: action.payload.affectedRows === 1,
          errorMessage:
            action.payload.affectedRows !== 1 ? 'Team not created' : undefined,
          status: 'idle',
        };
      })
      .addCase(createTeamAsync.rejected, (state) => {
        state.teamCreated = {
          message: undefined,
          error: true,
          errorMessage: 'Team creation failed!',
          status: 'failed',
        };
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

      .addCase(getAllTeams.pending, (state) => {
        state.TeamWithUser.status = 'loading';
        state.TeamWithUser.TeamWithUsers = [];
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.TeamWithUser.status = 'idle';
        state.allTeams.teams = action.payload.map((t) => ({
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
        state.updateTeam.status = 'success';
        state.updateTeam.message = action.payload.message;
      })
      .addCase(assignUserRoleInTeamAsync.rejected, (state) => {
        state.allTeams.status = 'failed';
        state.updateTeam.message = 'Failed to update Team Name!';
      });
  },
});

export const {
  setUserToTeam,
  setTeamName,
  idleTeamNameUpdateStatus,
  resetTeam,
} = teamSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const teamWithUsers = (state: RootState) =>
  state.team.TeamWithUser.TeamWithUsers;
export const allTeams = (state: RootState) => state.team.allTeams;
export const selectedTeamId = (state: RootState) => state.team.selectedTeamId;
export const updateTeamState = (state: RootState) => state.team.updateTeam;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const logoutAsync =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default teamSlice.reducer;
