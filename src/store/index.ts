import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameReducer';
import lobbyReducer from './lobbyReducer';
import userReducer from './userReducer';

const store = configureStore({
    reducer: {
        gameReducer,
        lobbyReducer,
        userReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
