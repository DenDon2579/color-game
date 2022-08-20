import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../types/board';
import { TLobby } from '../types/lobby';
import { IUser } from '../types/user';
import { ref, set } from 'firebase/database';

import { database } from '../firestore';

interface IState {
    board: IBoard;
}

const initialState: IState = {
    board: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        setBoard(state, action: PayloadAction<IBoard>) {
            state.board = action.payload;
        },
    },
});

export default gameSlice.reducer;

export const { setBoard } = gameSlice.actions;
