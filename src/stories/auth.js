import { authService } from "@/services/auth";
import { userService } from "@/services/user";
import {
  clearToken,
  clearUser,
  getToken,
  getUser,
  handleError,
  setToken,
  setUser,
} from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartActions, getCartAction } from "./cart";

const initialState = {
  user: getUser(),
  status: "idle",
  loginLoading: false,
};
export const loginAction = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const res = await authService.login(data);
      setToken(res.data);
      const user = await userService.getUser();
      setUser(user.data);
      thunkApi.dispatch(getCartAction());
      return user.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const loginByCodeAction = createAsyncThunk(
  "auth/loginByCode",
  async (code, thunkApi) => {
    try {
      const res = await authService.loginByCode({ code });
      setToken(res.data);
      const user = await userService.getUser();
      setUser(user.data);
      return user.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const logoutAction = createAsyncThunk("auth/logout", (_, thunkApi) => {
  thunkApi.dispatch(cartActions.setCart(null));
  clearUser();
  clearToken();
});

export const setUserAction = createAsyncThunk(
  "auth/setUser",
  (user, thunkApi) => {
    setUser(user);
    thunkApi.dispatch(authActions.setUser(user));
    return user;
  }
);

export const getUserAction = createAsyncThunk(
  "auth/getUser",
  async (_, thunkApi) => {
    try {
      if (getToken()) {
        const user = await userService.getUser();
        return user.data;
      }
    } catch (error) {
      handleError(error);
    }
  }
);

export const { reducer: authReducer, action: authActions } = createSlice({
  initialState,
  name: "auth",
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    // },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loginLoading = false;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.loginLoading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.user = null;
    });

    builder.addCase(loginByCodeAction.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(setUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
