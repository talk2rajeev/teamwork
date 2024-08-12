import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import * as fetcher from '../../services/fetcher/fetcher';
import * as Types from '../../utils/types/types';
// import { login, logoutAsyncApi } from './loginAPI';

// type productWithTeam = product & {
//   team: { teamId: number; teamName: string };
// };

type TeamCreated = {
  message?: string;
  error?: boolean;
  errorMessage?: string;
  status: 'idle' | 'loading' | 'failed';
};

export interface TeamState {
  TeamWithUser: {
    status: Types.StatusType;
    teamMap: Types.TeamWithUserInterface[];
  };
  teamCreated?: TeamCreated;
}

const initialState: TeamState = {
  TeamWithUser: {
    status: 'idle',
    teamMap: [],
  },
  teamCreated: undefined,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createTeamAsync = createAsyncThunk(
  'team/createTeam',
  async (reqPayload: { teamName: string; createdById: number }) => {
    type responseType = {
      fieldCount: number;
      affectedRows: number;
      insertId: number;
      info: string;
      serverStatus: number;
      warningStatus: number;
      changedRows: number;
    };
    const response = await fetcher.post<Types.CreateResponseType>(
      '/team/createTeam',
      reqPayload
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getTeamsWithUsersAsync = createAsyncThunk(
  '/team/getTeamsWithUsers',
  async () => {
    // type responseType = Array<TeamWithUserInterface>;
    const response = await fetcher.get<Array<Types.TeamWithUserInterface>>(
      '/team/getAllTeamsWithUsers'
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
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
        state.TeamWithUser.teamMap = [];
      })
      .addCase(getTeamsWithUsersAsync.fulfilled, (state, action) => {
        state.TeamWithUser.status = 'idle';
        state.TeamWithUser.teamMap = action.payload;
      })
      .addCase(getTeamsWithUsersAsync.rejected, (state) => {
        state.TeamWithUser.status = 'failed';
        state.TeamWithUser.teamMap = [];
      });
  },
});

// export const { logout, setSelectedProductId, clearSelectedProduct } = teamSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const teamMap = (state: RootState) => state.team.TeamWithUser.teamMap;

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