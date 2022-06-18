import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./reducers/locationsReducer";

export default configureStore({
  reducer: {
    locations: locationsReducer,
  },
});