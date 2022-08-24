import { ref, set } from 'firebase/database';
import { Timestamp } from 'firebase/firestore';
import { database } from '../firestore';
import Game from '../logic/Game';
import {
    setClientBoard,
    setClientGame,
    setClientPlayers,
} from '../store/gameReducer';
import { setHost } from '../store/userReducer';
import { IBoardInfo } from '../types/board';
import { IPosition } from '../types/cell';
import { IGameInfo } from '../types/game';
import { IPlayerInfo } from '../types/player';
import { useAppDispatch, useAppSelector } from './react-redux';

const game = new Game();

export const useGame = () => {
    const dispatch = useAppDispatch();

    const lobby = useAppSelector((state) => state.lobbyReducer.lobby);
    const userID = useAppSelector((state) => state.userReducer.info?.userID);

    return {
        init() {
            game.createPlayers(lobby);
            game.createBoard();

            if (game.getPlayersInfo()[0].userID === userID) {
                dispatch(setHost(true));
                setServerGameInfo(game.getInfo());
                setServerPlayersInfo(game.getPlayersInfo());
                setServerBoardInfo(game.getBoardInfo());
            }
        },
        start() {
            game.start();
            setServerGameInfo(game.getInfo());
        },
        info() {
            return [game.getInfo(), game.getPlayersInfo(), game.getBoardInfo()];
        },

        grabCell(position: IPosition) {
            game.grabCell(position);
            setServerBoardInfo(game.getBoardInfo());
            nextTurn();
        },

        setClientGameInfo(gameInfo: IGameInfo) {
            dispatch(setClientGame(gameInfo));
            game.setInfo(gameInfo);
        },

        setClientBoardInfo(boardInfo: IBoardInfo) {
            dispatch(setClientBoard(boardInfo));
            game.setBoardInfo(boardInfo);
        },

        setClientPlayersInfo(playersInfo: IPlayerInfo[]) {
            dispatch(setClientPlayers(playersInfo));
            game.setPlayersInfo(playersInfo);
        },
    };
};

const setServerGameInfo = (gameInfo: IGameInfo) => {
    set(ref(database, 'gameInfo'), gameInfo);
};
const setServerPlayersInfo = (playersInfo: IPlayerInfo[]) => {
    set(ref(database, 'playersInfo'), playersInfo);
};
const setServerBoardInfo = (boardInfo: IBoardInfo | null) => {
    if (boardInfo) {
        set(ref(database, 'board'), boardInfo);
    }
};

const nextTurn = () => {
    game.nextTurn();
    setServerGameInfo(game.getInfo());
};
