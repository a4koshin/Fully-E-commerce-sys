import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {authApi} from './auth/authApi'
import {daynamicApi} from './dynamicApi'


export default configureStore({
  reducer: {
      [authApi.reducerPath] : authApi.reducer,
      [daynamicApi.reducerPath] : daynamicApi.reducer,
  },
  devTools:false,

  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(
          authApi.middleware, 
          daynamicApi.middleware, 
          ),
  
});
