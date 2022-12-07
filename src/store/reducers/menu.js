import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    isAuth: false,
    user: {
        firstName: "",
        lastName: "",
        email: ""
    },
    role: "",
};

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
            state.role = action.payload.role;
            state.user = action.payload.user
        },

        logout(state, action) {
            state.isAuth = action.payload.isAuth;
            state.role = "";
            state.user = {
                firstName: "",
                lastName: "",
                email: ""
            }
        }
    }
});

export default menu.reducer;

export const { logout, login, activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;
