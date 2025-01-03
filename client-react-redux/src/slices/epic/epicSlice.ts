import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import * as fetcher from '../../services/fetcher/fetcher';
import * as Types from '../../utils/types/types';

const initialState: Types.EpicState = {
  epics: {
    status: 'idle',
    epicList: [],
  },
  selectedEpicUserStories: {
    status: 'idle',
    epicUserStories: [],
  },
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getEpicsAsync = createAsyncThunk('epic/getEpics', async () => {
  const response = await fetcher.get<Array<Types.EpicType>>('/epic/getEpics');
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const getUserStoriesByEpicIdAsync = createAsyncThunk<
  Types.EpicUserStories[],
  string
>(
  'userStory/getDetailedUserStoriesByEpicId',
  async (epicId: string, thunkAPI) => {
    const response = await fetcher.get<Types.EpicUserStories[]>(
      `/userStory/getDetailedUserStoriesByEpicId/${epicId}`
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const epicSlice = createSlice({
  name: 'epic',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetEpics: (state) => {
      state.epics.epicList = [];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getEpicsAsync.pending, (state) => {
        state.epics.status = 'loading';
      })
      .addCase(getEpicsAsync.fulfilled, (state, action) => {
        state.epics.epicList = action.payload;
      })
      .addCase(getEpicsAsync.rejected, (state) => {
        state.epics.status = 'failed';
      })

      .addCase(getUserStoriesByEpicIdAsync.pending, (state) => {
        state.selectedEpicUserStories.status = 'loading';
      })
      .addCase(getUserStoriesByEpicIdAsync.fulfilled, (state, action) => {
        state.selectedEpicUserStories.status = 'idle';
        state.selectedEpicUserStories.epicUserStories = action.payload;
      })
      .addCase(getUserStoriesByEpicIdAsync.rejected, (state) => {
        state.selectedEpicUserStories.status = 'failed';
      });
  },
});

export const { resetEpics } = epicSlice.actions;

export const epicState = (state: RootState) => state.epic;

export default epicSlice.reducer;
