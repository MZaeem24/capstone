import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Booking {
    id: string;
    restaurantId: string;
    date: string;
}

interface BookingState {
    bookings: Booking[];
}

const initialState: BookingState = {
    bookings: [],
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<BookingState['bookings']>) => {
            state.bookings = action.payload;
        },
    },
});

export const { setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
