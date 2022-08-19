import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../types/board';
import { TLobby } from '../types/lobby';
import { IUser } from '../types/user';
import { getDatabase, ref, set } from 'firebase/database';
import { firebaseApp } from '..';

interface IState {
    board: IBoard;
    user: {
        isAuth: boolean;
        info: IUser | null;
    };
    lobby: TLobby;
}

const initialState: IState = {
    user: {
        isAuth: false,
        info: null,
    },
    lobby: ['', '', '', ''],
    board: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        setBoard(state, action: PayloadAction<IBoard>) {
            state.board = action.payload;
        },
        signIn(state, action: PayloadAction<IUser>) {
            state.user.info = action.payload;
            state.user.isAuth = true;
        },
        addPlayerToLobby(state, action: PayloadAction<IUser>) {
            const emptyIndex = state.lobby.findIndex((i) => i === '');
            if (emptyIndex !== -1) {
                state.lobby[emptyIndex] = action.payload;
            }
            if (state.user.info) {
                state.user.info.isInLobby = action.payload.isInLobby;
                state.user.info.isReady = false;
            }
            const database = getDatabase(firebaseApp);
            set(ref(database, 'lobby'), state.lobby);
        },

        setLobby(state, action: PayloadAction<TLobby>) {
            state.lobby = action.payload;
        },

        toggleReadyStatus(state, action: PayloadAction<string>) {
            const userIndex = state.lobby.findIndex((i) => {
                if (i) {
                    return i.userID === action.payload;
                }
            });
            const user = state.lobby[userIndex];
            if (user) {
                user.isReady = !user.isReady;
            }

            const database = getDatabase(firebaseApp);
            set(ref(database, 'lobby'), state.lobby);
            if (state.user.info) {
                state.user.info.isReady = !state.user.info.isReady;
            }
        },

        removePlayerFromLobby(state, action: PayloadAction<string>) {
            const database = getDatabase(firebaseApp);
            const userIndex = state.lobby.findIndex((i) => {
                if (i) {
                    return i.userID === action.payload;
                }
            });
            if (state.user.info) {
                state.user.info.isInLobby = false;
                state.user.info.isReady = false;
            }
            if (userIndex !== -1) {
                state.lobby[userIndex] = '';

                set(ref(database, 'lobby'), state.lobby);
            }
        },
    },
});

export default gameSlice.reducer;

export const {
    setBoard,
    signIn,
    addPlayerToLobby,
    setLobby,
    removePlayerFromLobby,
    toggleReadyStatus,
} = gameSlice.actions;
