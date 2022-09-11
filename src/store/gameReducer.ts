import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardInfo } from '../types/board';
import { IPlayerInfo } from '../types/player';
import { IGameInfo } from '../types/game';

interface IState {
    board: IBoardInfo;
    players: IPlayerInfo[];
    game: IGameInfo | null;
}

const initialState: IState = {
    board: [],
    players: [],
    game: null,
};

const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        setClientBoard(state, action: PayloadAction<IBoardInfo>) {
            state.board = action.payload;
        },
        setClientGame(state, action: PayloadAction<IGameInfo>) {
            state.game = action.payload;
        },
        setClientPlayers(state, action: PayloadAction<IPlayerInfo[]>) {
            state.players = action.payload;
        },
    },
});

export default gameSlice.reducer;

export const { setClientBoard, setClientGame, setClientPlayers } =
    gameSlice.actions;
