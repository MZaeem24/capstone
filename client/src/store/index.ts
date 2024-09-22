import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import restaurantReducer from './slices/restaurantSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
        booking: bookingReducer,
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;