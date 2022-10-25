// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    isAuth: false
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        },

        login(state, action) {
            state.isAuth = action.payload.isAuth;
        },

        logout(state, action) {
            state.isAuth = action.payload.isAuth;
        }
    }
});

export default menu.reducer;

export const { logout, login, activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;
