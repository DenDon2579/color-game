import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ref, set } from 'firebase/database';
import { database } from '../firestore';
import { TLobby } from '../types/lobby';
import { IUser } from '../types/user';

interface IState {
    lobby: TLobby;
}

const initialState: IState = {
    lobby: ['', '', '', ''],
};

const lobbySlice = createSlice({
    name: 'lobby',
    initialState: initialState,
    reducers: {
        setClientLobby(state, action: PayloadAction<TLobby>) {
            state.lobby = action.payload;
        },
    },
});

export default lobbySlice.reducer;
export const { setClientLobby } = lobbySlice.actions;
