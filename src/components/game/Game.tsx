import { ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { Link } from 'react-router-dom';
import { TOTAL_TURNS } from '../../constants';

import { database } from '../../firestore';
import { useGame } from '../../hooks/game-hooks';
import { useLobby } from '../../hooks/lobby-hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';

import {
    setClientBoard,
    setClientGame,
    setClientPlayers,
} from '../../store/gameReducer';
import { IBoardInfo } from '../../types/board';
import { IGameInfo } from '../../types/game';
import { IPlayerInfo } from '../../types/player';

import Board from '../board/Board';
import classes from './Game.module.scss';
import GameOver from './gameOver/GameOver';
import PlayersStats from './playersStats/PlayersStats';

const Game: React.FC = () => {
    const isHost = useAppSelector((state) => state.userReducer.isHost);
    const gameStatus = useAppSelector(
        (state) => state.gameReducer.game?.status
    );
    const lobby = useLobby();
    const gameState = useAppSelector((state) => state.gameReducer);
    const dispatch = useAppDispatch();
    const game = useGame();
    const [serverBoard, boardLoading] = useList(ref(database, 'board'));
    const [serverGame, gameLoading] = useList(ref(database, 'gameInfo'));
    const [serverPlayers, playersLoading] = useList(
        ref(database, 'playersInfo')
    );

    const [movingPlayerName, setMovingPlayerName] = useState<string>('');

    useEffect(() => {
        const movingPlayerCode = game.getMovingPlayerCode();
        if (movingPlayerCode !== -1) {
            setMovingPlayerName(
                gameState.players[movingPlayerCode]?.displayName
            );
        }
    }, [gameState]);

    useEffect(() => {
        if (!boardLoading) {
            const board = serverBoard?.map((i) => i.val());
            game.setClientBoardInfo(board as IBoardInfo);
        }
    }, [serverBoard, dispatch, boardLoading]);

    useEffect(() => {
        if (!gameLoading && serverGame) {
            const [cellsCount, playersCodes, status, turn, turnsCount] =
                serverGame.map((i) => i.val());
            const gameInfo: IGameInfo = {
                cellsCount,
                playersCodes,
                status,
                turn,
                turnsCount,
            };
            game.setClientGameInfo(gameInfo);
        }
    }, [serverGame, dispatch, gameLoading]);

    useEffect(() => {
        if (!playersLoading) {
            const players = serverPlayers?.map((i) => i.val());
            game.setClientPlayersInfo(players as IPlayerInfo[]);
        }
    }, [serverPlayers, dispatch, playersLoading]);

    useEffect(() => {
        if (gameState.game?.status !== 'playing') {
            game.init();
        }
    }, []);

    return (
        <div className={classes.game}>
            {gameStatus === 'playing' ? (
                <>
                    <div className={classes.gameInfo}>
                        <span>{'Ходит: ' + movingPlayerName}</span>
                        <span>
                            Осталось ячеек: {gameState.game?.cellsCount}
                        </span>

                        <span>
                            Ход: {gameState.game?.turnsCount} из {TOTAL_TURNS}
                        </span>
                    </div>
                    <Board />
                    <div className={classes.playersStats}>
                        <PlayersStats players={gameState.players} />
                    </div>
                </>
            ) : gameStatus === 'notPlaying' ? (
                <div className={classes.preGameMessage}>
                    {isHost ? (
                        <>
                            <span>
                                Вы хост этой игры.
                                <br /> Начинайте как будете готовы.
                            </span>
                            <button
                                className={classes.button}
                                onClick={game.start}
                            >
                                Начать игру
                            </button>
                        </>
                    ) : (
                        <span>Ожидание хоста</span>
                    )}
                </div>
            ) : (
                <GameOver players={gameState.players} />
            )}
        </div>
    );
};
export default Game;
