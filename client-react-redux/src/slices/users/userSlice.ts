import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import * as fetcher from '../../services/fetcher/fetcher';
import * as Types from '../../utils/types/types';

const initialState: Types.UserState = {
  allUsers: {
    status: 'idle',
    users: [],
  },
  roles: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllUsersAsync = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    const response =
      await fetcher.get<Array<Types.UserType>>('/user/getAllUsers');
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const searchUsersAsync = createAsyncThunk(
  'user/searchUsers',
  async (searchValue: string, thunkAPI) => {
    const response = await fetcher.get<Array<Types.UserType>>(
      `/user/searchUser?searchValue=${searchValue}`
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const createNewUsersAsync = createAsyncThunk<
  Types.GenericResponseType<undefined>,
  Types.UserCreationReqPaylod
>('user/createLogin', async (user: Types.UserCreationReqPaylod, thunkAPI) => {
  const response = await fetcher.post<Types.GenericResponseType<undefined>>(
    `/user/createLogin`,
    user
  );
  thunkAPI.dispatch(getAllUsersAsync());
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const getUserRolesAsync = createAsyncThunk<
  Types.GenericResponseType<Types.Role[]>
>('role/getAllRoles', async () => {
  const response =
    await fetcher.get<Types.GenericResponseType<Types.Role[]>>(
      `/role/getAllRoles`
    );
  // The value we return becomes the `fulfilled` action payload
  return response;
});

type UserFormDataType = {
  fname?: string;
  lname?: string;
  profileId: string;
};
export const updateUserAsync = createAsyncThunk<
  Types.GenericResponseType<undefined>,
  UserFormDataType
>('user/updateProfile', async (UserFormData: UserFormDataType, thunkAPI) => {
  const { profileId, ...reqPayload } = UserFormData;
  const response = await fetcher.post<Types.GenericResponseType<undefined>>(
    `/user/updateProfile/${UserFormData.profileId}`,
    reqPayload
  );
  if (response.success) thunkAPI.dispatch(getAllUsersAsync());
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetUserCreated: (state) => {
      state.userCreated = undefined;
    },
    resetCreateUserState: (state) => {
      state.userCreated = undefined;
    },
    resetUpdateUserState: (state) => {
      state.userUpdated = undefined;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state) => {
        state.allUsers = {
          status: 'loading',
          users: [],
        };
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.allUsers = {
          status: 'idle',
          users: action.payload,
        };
      })
      .addCase(getAllUsersAsync.rejected, (state) => {
        state.allUsers = {
          status: 'failed',
          users: [],
        };
      })

      .addCase(searchUsersAsync.pending, (state) => {
        state.allUsers = {
          status: 'loading',
          users: [],
        };
      })
      .addCase(searchUsersAsync.fulfilled, (state, action) => {
        state.allUsers = {
          status: 'idle',
          users: action.payload,
        };
      })
      .addCase(searchUsersAsync.rejected, (state) => {
        state.allUsers = {
          status: 'failed',
          users: [],
        };
      })

      .addCase(createNewUsersAsync.pending, (state) => {
        state.userCreated = {
          status: 'loading',
          message: '',
          type: 'info',
        };
      })
      .addCase(createNewUsersAsync.fulfilled, (state, action) => {
        state.userCreated = {
          status: 'idle',
          message: action.payload.message,
          type: action.payload.success ? 'success' : 'error',
        };
      })
      .addCase(createNewUsersAsync.rejected, (state, action) => {
        state.userCreated = {
          status: 'failed',
          message: action.error.message,
          type: 'error',
        };
      })

      .addCase(getUserRolesAsync.fulfilled, (state, action) => {
        state.roles = action.payload.data;
      })
      .addCase(getUserRolesAsync.rejected, (state, action) => {
        state.roles = [];
      })

      .addCase(updateUserAsync.pending, (state) => {
        state.userUpdated = {
          status: 'loading',
          message: '',
          type: 'info',
        };
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.userUpdated = {
          status: 'idle',
          message: action.payload.message,
          type: action.payload.success ? 'success' : 'error',
        };
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.userUpdated = {
          status: 'failed',
          message: action.error.message,
          type: 'error',
        };
      });
  },
});

export const { resetUserCreated, resetCreateUserState, resetUpdateUserState } =
  userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const allUsers = (state: RootState) => state.user.allUsers;
export const userReducerState = (state: RootState) => state.user;

export default userSlice.reducer;
