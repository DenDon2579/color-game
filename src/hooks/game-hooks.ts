import { ref, set } from 'firebase/database';
import { database } from '../firestore';
import { Game } from '../logic/game';
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
import { useLobby } from './lobby-hooks';
import { useAppDispatch, useAppSelector } from './react-redux';

const game = new Game();

export const useGame = () => {
    const dispatch = useAppDispatch();
    const lobby = useLobby();
    const lobbyState = useAppSelector((state) => state.lobbyReducer.lobby);
    const userID = useAppSelector((state) => state.userReducer.info?.userID);

    return {
        init() {
            game.init();
            game.createPlayers(lobbyState);
            game.createBoard();
            if (game.getPlayersInfo()[0].userID === userID) {
                dispatch(setHost(true));
                setServerGameInfo(game.getInfo());
                setServerPlayersInfo(game.getPlayersInfo());
                setServerBoardInfo(game.getBoardInfo());
            }
        },

        start(turns: number) {
            game.start(turns);
            setServerGameInfo(game.getInfo());
            lobby.reset();
        },

        grabCell(position: IPosition) {
            const isSuccessful = game.grabCell(position);
            if (isSuccessful) {
                const gameInfo = game.getInfo();

                setServerBoardInfo(game.getBoardInfo());
                setServerGameInfo(gameInfo);
                setServerPlayersInfo(game.getPlayersInfo());

                if (gameInfo.cellsCount < 1) {
                    nextTurn();
                    checkBase();
                    const turnsCount = gameInfo.turnsCount;
                    const totalTurns = gameInfo.totalTurns;
                    if (turnsCount === totalTurns) {
                        finish();
                    }
                }
            }
        },

        getMovingPlayerCode(): number {
            const turn = game.getInfo().turn;
            if (turn !== '') {
                return game.getPlayerCode(turn);
            }
            return -1;
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
    set(ref(database, 'board'), boardInfo);
};

const finish = () => {
    game.finish();
    setServerGameInfo(game.getInfo());
    setServerBoardInfo(game.getBoardInfo());
};

const nextTurn = () => {
    game.nextTurn();
    setServerGameInfo(game.getInfo());
};

const checkBase = () => {
    const currentTurn = game.getInfo().turn;
    if (currentTurn !== '') {
        game.isBaseCaptured(currentTurn) && game.hurtPlayer(currentTurn);
    }

    setServerGameInfo(game.getInfo());
    setServerBoardInfo(game.getBoardInfo());
    setServerPlayersInfo(game.getPlayersInfo());
};
