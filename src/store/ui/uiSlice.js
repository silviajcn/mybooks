import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isSidebarOpen: false
    },
    reducers: {
        onOpenSidebar: (state) => {
            state.isSidebarOpen = true;
        },
        onCloseSidebar: (state) => {
            state.isSidebarOpen = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenSidebar, onCloseSidebar } = uiSlice.actions;