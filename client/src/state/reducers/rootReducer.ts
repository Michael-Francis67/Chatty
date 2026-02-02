import {createSlice} from "@reduxjs/toolkit";

interface AppState {
    isLoading: boolean;
    error: string | null;
}

const initialState: AppState = {
    isLoading: false,
    error: null,
};

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {setLoading, setError} = rootSlice.actions;

export default rootSlice.reducer;
