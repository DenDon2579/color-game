import React from 'react';
import { useGame } from '../../hooks/game-hooks';
import { useAppSelector } from '../../hooks/react-redux';
import gameReducer from '../../store/gameReducer';

import Cell from '../cell/Cell';
import classes from './Board.module.scss';

interface IProps {}

const Board: React.FC<IProps> = () => {
    const board = useAppSelector((state) => state.gameReducer.board);
    const turn = useAppSelector((state) => state.gameReducer.game?.turn);
    const players = useAppSelector((state) => state.gameReducer.players);
    const currentUserID = useAppSelector(
        (state) => state.userReducer.info?.userID
    );
    const myCode = players.find(
        (player) => player.userID === currentUserID
    )?.playerCode;
    const isMyTurn = myCode === turn;

    const game = useGame();

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
