import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameReducer';
const store = configureStore({
    reducer: {
        gameReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
