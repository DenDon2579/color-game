import { ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { useList } from 'react-firebase-hooks/database';

import { database } from '../../firestore';
import { useGame } from '../../hooks/game-hooks';
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

const Game: React.FC = () => {
    const isHost = useAppSelector((state) => state.userReducer.isHost);
    const isPlaying = useAppSelector(
        (state) => state.gameReducer.game?.isPlaying
    );
    const gameState = useAppSelector((state) => state.gameReducer);
    const dispatch = useAppDispatch();
    const game = useGame();
    const [serverBoard, boardLoading] = useList(ref(database, 'board'));
    const [serverGame, gameLoading] = useList(ref(database, 'gameInfo'));
    const [serverPlayers, playersLoading] = useList(
        ref(database, 'playersInfo')
    );

    useEffect(() => {
        if (!boardLoading) {
            const board = serverBoard?.map((i) => i.val());
            game.setClientBoardInfo(board as IBoardInfo);
        }
    }, [serverBoard, dispatch, boardLoading]);

    useEffect(() => {
        if (!gameLoading && serverGame) {
            const [cellsCount, isPlaying, turn] = serverGame.map((i) =>
                i.val()
            );
            const gameInfo: IGameInfo = {
                cellsCount,
                isPlaying,
                turn,
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
        if (!gameState.game?.isPlaying) {
            game.init();
        }
    }, []);

    return (
        <div className={classes.game}>
            {isPlaying ? (
                <>
                    <div className={classes.gameInfo}>
                        <span>
                            {'Ходит: ' +
                                gameState.players.find(
                                    (player) =>
                                        player.playerCode ===
                                        gameState.game?.turn
                                )?.displayName}
                        </span>

                        <span>
                            Осталось ячеек: {gameState.game?.cellsCount}
                        </span>
                    </div>
                    <Board />
                    <div className={classes.playersInfo}></div>
                </>
            ) : (
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
            )}
        </div>
    );
};
export default Game;
