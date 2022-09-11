import React, { useEffect, useState } from 'react';
import { useGame, useGameSync } from '../../hooks/game-hooks';
import { useAppSelector } from '../../hooks/react-redux';
import Board from '../board/Board';
import classes from './Game.module.scss';
import GameOver from './gameOver/GameOver';
import PlayersStats from './playersStats/PlayersStats';
import TurnsForm from './turnsForm/TurnsForm';

const Game: React.FC = () => {
    const isHost = useAppSelector((state) => state.userReducer.isHost);
    const gameStatus = useAppSelector(
        (state) => state.gameReducer.game?.status
    );
    useGameSync();
    const gameState = useAppSelector((state) => state.gameReducer);
    const game = useGame();

    const [movingPlayerName, setMovingPlayerName] = useState<string>('');

    useEffect(() => {
        const movingPlayerCode = game.getMovingPlayerCode();
        if (movingPlayerCode !== -1) {
            setMovingPlayerName(
                gameState.players[movingPlayerCode]?.displayName
            );
        }
    }, [gameState, game]);

    useEffect(() => {
        if (gameState.game?.status !== 'playing') {
            game.init();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            Ход: {gameState.game?.turnsCount} из{' '}
                            {gameState.game?.totalTurns}
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
                                <br />
                                Выберите количество ходов чтобы начать игру.
                            </span>

                            <TurnsForm start={game.start} />
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
