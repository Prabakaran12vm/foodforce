import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

// Step1. Create a store with configure store function
const appStore = configureStore({
  reducer: {
    // Step4. Add slice reducers to the redux store
    cart: cartReducer,
  },
});

export default appStore;
