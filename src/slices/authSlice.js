import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;


const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem('token')
  ? CryptoJS.AES.decrypt(localStorage.getItem('token'), secretKey).toString(CryptoJS.enc.Utf8)
  : null,
  // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;