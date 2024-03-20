import { authService } from "@/services/auth";
import { userService } from "@/services/user";
import { clearToken, clearUser, getUser, setToken, setUser } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  },
});

export const logoutAction = createAsyncThunk("auth/logout", (_, thunkApi) => {
  // thunkApi.dispatch(authActions.logout());
  clearUser();
  clearToken();
});
