import {
  configureStore,
  type Action,
  type Middleware,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import HomePageReducer from "./screens/homePage/slice";
import PropertiesPageReducer from "./screens/propertiesPage/slice";
import AgentsPageReducer from "./screens/agentsPage/slice";
import AgenciesPageReducer from "./screens/agenciesPage/slice";
import BlogsPageReducer from "./screens/blogsPage/slice";
import ContactUsPageReducer from "./screens/contactUs/slice";

// so Middletype says to typescript, trust me logger is a valid Redux middleware
const logger: Middleware = createLogger();
export const store = configureStore({
  //  getDefaultMiddleware() to get Redux Toolkit’s built-in middlewares (like redux-thunk and serializableCheck) => concat(...). Then uses .concat(reduxLogger) to add your own custom logger middleware.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

  reducer: {
    // we can write the lists of the reducers here
    homepage: HomePageReducer,
    propertiesPage: PropertiesPageReducer,
    agentsPage: AgentsPageReducer,
    agenciesPage: AgenciesPageReducer,
    blogsPage: BlogsPageReducer,
    contactUsPage: ContactUsPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch; // this givs us the type of our redux store's dispatch function it controls actions
export type RootState = ReturnType<typeof store.getState>; // This extracts the entire Redux state object’s type from your store automatically. // If you rename your reducers or add more slices later, RootState updates automatically — no need to manually retype the structure.

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>; // This defines the type for async thunk functions (when you use Redux Thunk), it is useful for types of async functions
