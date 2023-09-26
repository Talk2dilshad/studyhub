import {createSlice} from "@reduxjs/toolkit"
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;

const initialState = {
    user: localStorage.getItem('user')
    ? JSON.parse(
        CryptoJS.AES.decrypt(localStorage.getItem('user'), secretKey).toString(CryptoJS.enc.Utf8)
      )
    : null,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
});

export const {setUser,setLoading} = profileSlice.actions;
export default profileSlice.reducer;