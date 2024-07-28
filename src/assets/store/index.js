import { configureStore } from "@reduxjs/toolkit";
import * as people from "./slices/people";


const store = configureStore({
  reducer: {
    people: people.default
  }
});




export default store;

