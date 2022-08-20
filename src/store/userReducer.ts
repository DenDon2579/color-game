import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/user';

interface IState {
    isAuth: boolean;
    info: IUser | null;
}

const initialState: IState = {
    isAuth: false,
    info: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn(state, action: PayloadAction<IUser>) {
            state.info = action.payload;
            state.isAuth = true;
        },

        setReadyStatus(state, action: PayloadAction<boolean>) {
            if (state.info) {
                state.info.isReady = action.payload;
            }
        },

        setIsInLobbyStatus(state, action: PayloadAction<boolean>) {
            if (state.info) {
                state.info.isInLobby = action.payload;
            }
        },
    },
});

export default userSlice.reducer;

export const { signIn, setReadyStatus, setIsInLobbyStatus } = userSlice.actions;
