import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";
import courseSlices from "../slices/courseSlices";
import viewCourseSlice from "../slices/viewCourseSlice";

const rootReducer = combineReducers({
    auth:authSlice,
    profile:profileSlice,
    cart:cartSlice,
    course:courseSlices,
    viewCourse:viewCourseSlice
});

export default rootReducer;