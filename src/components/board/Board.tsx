import React from 'react';
import { useGame } from '../../hooks/game-hooks';
import { useAppSelector } from '../../hooks/react-redux';
import Cell from '../cell/Cell';
import classes from './Board.module.scss';

const Board: React.FC = () => {
    const game = useGame();
    const board = useAppSelector((state) => state.gameReducer.board);

    const players = useAppSelector((state) => state.gameReducer.players);
    const currentUserID = useAppSelector(
        (state) => state.userReducer.info?.userID
    );
    const myCode = players.find(
        (player) => player.userID === currentUserID
    )?.playerCode;
    console.log(game.getMovingPlayerCode());

    const isMyTurn = myCode === game.getMovingPlayerCode();

    return (
        <div className={classes.board}>
            <div
                className={classes.cellsWrapper}
                style={{
                    pointerEvents: isMyTurn ? 'all' : 'none',
                    filter: `grayscale(${isMyTurn ? 0 : 0.5})`,
                }}
            >
                {board?.map((row) =>
                    row.map((cell) => (
                        <Cell
                            grabCell={game.grabCell}
                            cell={cell}
                            key={(cell.position.x + cell.position.y).toString()}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
export default Board;
