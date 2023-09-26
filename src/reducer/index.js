import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";
import courseSlices from "../slices/courseSlices";

const rootReducer = combineReducers({
    auth:authSlice,
    profile:profileSlice,
    cart:cartSlice,
    course:courseSlices
});

export default rootReducer;