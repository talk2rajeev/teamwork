import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../appStore/store';
import * as fetcher from '../../services/fetcher/fetcher';
import * as Types from '../../utils/types/types';
import { showNotification } from '../notificationSlice/notificationSlice';
// import { login, logoutAsyncApi } from './loginAPI';

// type productWithTeam = product & {
//   team: { teamId: number; teamName: string };
// };

type productCreated = {
  message?: string;
  error?: boolean;
  errorMessage?: string;
  status: 'idle' | 'loading' | 'failed';
};

type ApiResponseStatusType = 'success' | 'failed';

export interface productState {
  list: {
    productList: Array<Types.Product>;
    status: 'idle' | 'loading' | 'failed';
  };
  productCreated?: productCreated;
  selectedProduct: Types.SelectedProduct;
  selectedProductId: number;
  productFormData: Types.ProductFormDataInterface;
}

const initialState: productState = {
  list: {
    productList: [],
    status: 'idle',
  },
  productCreated: undefined,
  selectedProduct: {
    status: 'idle',
    product: [],
  },
  selectedProductId: -1,
  productFormData: { productId: -1 },
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(loginAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createProductAsync = createAsyncThunk(
  'auth/createProduct',
  async (reqPayload: Types.ProductReqPayload, thunkAPI) => {
    const response = await fetcher.post<Types.CreateResponseType>(
      '/product/createProduct',
      reqPayload
    );
    if (response.affectedRows === 1) {
      thunkAPI.dispatch(
        showNotification({
          notification: true,
          type: 'success',
          title: 'Success.',
          message: 'Product created successfully!',
        })
      );
    }
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getAllProductsAsync = createAsyncThunk(
  '/product/getAllProduct',
  async () => {
    type responseType = {
      productId: number;
      productName: string;
      product_owner_id: number;
      product_owner_fname: string;
      product_owner_lname: string;
    };
    const response = await fetcher.get<Array<responseType>>(
      '/product/getAllProducts'
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getProductWithTeamAsync = createAsyncThunk(
  '/product/getProductWithTeam',
  async (productId: number) => {
    const response = await fetcher.get<Array<Types.ProductwithTeam>>(
      `/product/getProductById/${productId}`
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { productId, ...rest } = state.product.productFormData;
    console.log('updateProductAsync > formData ', rest);
    const response = await fetcher.put<{
      message: string;
      status: ApiResponseStatusType;
    }>(`/product/updateProduct/${productId}`, rest);
    // The value we return becomes the `fulfilled` action payload
    thunkAPI.dispatch(getAllProductsAsync());
    if (response.status === 'success') {
      thunkAPI.dispatch(
        showNotification({
          notification: true,
          type: 'success',
          title: 'Success',
          message: response.message,
        })
      );
    }
    return response;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list.productList = [];
    },
    setSelectedProductId: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = {
        status: 'loading',
        product: [],
      };
      state.selectedProductId = -1;
    },
    setProductId: (state, action: PayloadAction<number>) => {
      state.productFormData = {
        ...state.productFormData,
        productId: action.payload,
      };
    },
    setProductName: (state, action: PayloadAction<string>) => {
      state.productFormData = {
        ...state.productFormData,
        productName: action.payload,
      };
    },
    setProductTeamId: (state, action: PayloadAction<number>) => {
      state.productFormData = {
        ...state.productFormData,
        teamId: action.payload,
      };
    },
    setProductOwnerId: (state, action: PayloadAction<number>) => {
      state.productFormData = {
        ...state.productFormData,
        product_owner_id: action.payload,
      };
    },
    clearProductForm: (state) => {
      state.productFormData = { productId: -1 };
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.productCreated = {
          status: 'loading',
          message: undefined,
          error: undefined,
          errorMessage: undefined,
        };
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.productCreated = {
          message:
            action.payload.affectedRows === 1
              ? 'Product created successfully!'
              : 'product could not be created',
          error: action.payload.affectedRows === 1,
          errorMessage:
            action.payload.affectedRows !== 1
              ? 'Product not created'
              : undefined,
          status: 'idle',
        };
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.productCreated = {
          message: undefined,
          error: true,
          errorMessage: 'Product creation failed!',
          status: 'failed',
        };
      })

      .addCase(getAllProductsAsync.pending, (state) => {
        state.list.status = 'loading';
        state.list.productList = [];
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.list.status = 'idle';
        state.list.productList = action.payload;
      })
      .addCase(getAllProductsAsync.rejected, (state) => {
        state.list.status = 'failed';
        state.list.productList = [];
      })

      .addCase(getProductWithTeamAsync.pending, (state) => {
        state.selectedProduct.status = 'loading';
      })
      .addCase(getProductWithTeamAsync.fulfilled, (state, action) => {
        state.selectedProduct.status = 'idle';
        state.selectedProduct.product = action.payload;
      })
      .addCase(getProductWithTeamAsync.rejected, (state) => {
        state.selectedProduct.status = 'idle';
        state.selectedProduct.product = [];
      });
  },
});

export const {
  logout,
  setSelectedProductId,
  clearSelectedProduct,
  setProductId,
  setProductName,
  setProductTeamId,
  setProductOwnerId,
  clearProductForm,
} = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const productListObject = (state: RootState) => state.product.list;
export const selectedProductId = (state: RootState) =>
  state.product.selectedProductId;
export const selectedProduct = (state: RootState) =>
  state.product.selectedProduct;
export const updateProductFormData = (state: RootState) =>
  state.product.productFormData;
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

export default productSlice.reducer;
