import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  name: "",
  email: "",
  accessToken: "",
  address: "https://ec87-106-240-72-242.ngrok-free.app",
  isLogin: false,
  loginType: "",
  searchType: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.isLogin = action.payload.isLogin;
      state.loginType = action.payload.loginType;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    userSliceReset(state) {
      state.uid = "";
      state.email = "";
      state.name = "";
      state.accessToken = "";
      state.address = "https://ec87-106-240-72-242.ngrok-free.app";
      state.isLogin = false;
      state.loginType = "";
      state.searchType = null;
    },
    setSearchType(state, action) {
      state.searchType = action.payload;
    },
  },
  //extraReducer는 비동기 액션 생성시 필요
  // extraReducers: builder => {},
});

export const {
  setUser,
  setName,
  setEmail,
  setAccessToken,
  setAddress,
  userSliceReset,
  setSearchType,
} = userSlice.actions;
export default userSlice.reducer;
