import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import { login, logoutAsyncApi } from '../../utils/api/login/loginAPI';
import { AuthUtil } from '../../utils/auth/auth';
import { setSessionStorage } from '../../utils/storage/storage';

export interface loginState {
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expireTime: number;
  } | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: loginState = {
  tokens: null,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (reqPayload: { username: string; password: string }) => {
    const response = await AuthUtil.login(reqPayload);
    // The value we return becomes the `fulfilled` action payload
    return JSON.parse(response);
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await logoutAsyncApi();
  // The value we return becomes the `fulfilled` action payload
  return;
});

export const loginSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tokens = null;
      sessionStorage.removeItem('login');
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tokens = action.payload;
        if (
          action.payload.accessToken &&
          action.payload.refreshToken &&
          action.payload.expiresIn
        ) {
          setSessionStorage('login', JSON.stringify(state));
          //sessionStorage.setItem('login', JSON.stringify(state));
        }
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tokens = null;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const loginDetails = (state: RootState) => state.login;

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

export default loginSlice.reducer;
