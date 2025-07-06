// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import AuthSlice from './Authslice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
// import { apiSlice } from "./apiSlice";


// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   user: AuthSlice,
//   [apiSlice.reducerPath]:apiSlice.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const Store = configureStore({
//   reducer: persistedReducer,
//   middleware:(getDefaultMiddleware)=>
//     getDefaultMiddleware({
//       serializableCheck: false,  // required because redux-persist
//     }).concat(apiSlice.middleware),
// });

// export const persistor = persistStore(Store);
// export default Store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./Authslice";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiSlice";

// Custom transform to conditionally persist the user slice
const conditionalPersistTransform = createTransform(
  // Transform state on its way to being serialized and persisted
  (inboundState, key) => {
    if (key === "user" && !inboundState.persist) {
      return {}; // Do not persist user state if persist is false
    }
    return inboundState;
  },
  // Transform state being rehydrated
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ["user"] } // Apply this transform only to the user slice
);

const persistConfig = {
  key: "root",
  storage,
  transforms: [conditionalPersistTransform], // Add the custom transform
  whitelist: ["user"], // Only persist the user slice
};

const rootReducer = combineReducers({
  user: AuthSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(Store);
export default Store;