import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import * as fetcher from '../../services/fetcher/fetcher';
import * as Types from '../../utils/types/types';

type ApiResponseStatusType = 'success' | 'failed';

const initialState: Types.SprintState = {
  sprint: {
    sprintList: [],
    status: 'idle',
  },
};

export const searchSprintAsync = createAsyncThunk<Types.Sprint[], string>(
  'sprint/searchSprint/:sprintName',
  async (sprintName: string, thunkAPI) => {
    const response = await fetcher.get<Types.Sprint[]>(
      `/sprint/searchSprint/${sprintName}`
    );

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getSprintListByProductIdAsync = createAsyncThunk<
  Types.Sprint[],
  string
>(
  'sprint/getSprintByProductId/:sprintName',
  async (sprintId: string, thunkAPI) => {
    const response = await fetcher.get<Types.Sprint[]>(
      `/sprint/getSprintByProductId/${sprintId}`
    );

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const sprintSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectSprint: (state, action: PayloadAction<Types.Sprint>) => {
      state.selectedSprint = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(searchSprintAsync.pending, (state) => {
        state.sprint.status = 'loading';
      })
      .addCase(searchSprintAsync.fulfilled, (state, action) => {
        state.sprint.status = 'idle';
        state.sprint.sprintList = action.payload;
      })
      .addCase(searchSprintAsync.rejected, (state, action) => {
        state.sprint.status = 'idle';
      })

      .addCase(getSprintListByProductIdAsync.pending, (state) => {
        state.sprint.status = 'loading';
      })
      .addCase(getSprintListByProductIdAsync.fulfilled, (state, action) => {
        state.sprint.status = 'idle';
        state.sprint.sprintList = action.payload;
      })
      .addCase(getSprintListByProductIdAsync.rejected, (state, action) => {
        state.sprint.status = 'idle';
      });
  },
});

export const { selectSprint } = sprintSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const springReducer = (state: RootState) => state.sprint;

export default sprintSlice.reducer;