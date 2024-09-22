import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Restaurant {
    id: string;
    name: string;
    cuisines: string[];
}

interface RestaurantState {
    restaurants: Restaurant[];
}

const initialState: RestaurantState = {
    restaurants: [],
};

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurants: (state, action: PayloadAction<RestaurantState['restaurants']>) => {
            state.restaurants = action.payload;
        },
    },
});

export const { setRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
