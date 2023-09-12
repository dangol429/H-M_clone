import { createSlice } from "@reduxjs/toolkit";

import { publicRequest } from "../requestMethod";
import Swal from "sweetalert2";

export const login = async (dispatch, user) => {
  console.log("LOGIN SKJSKO");
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/user/login", user);
    await Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: res.data.message,
    });
    dispatch(loginSuccess(res.data));
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: err.response.data.error,
    });
    dispatch(loginFailure());
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
