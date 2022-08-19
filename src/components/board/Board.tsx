import React from 'react';
import { useAppSelector } from '../../hooks/react-redux';
import { IBoard } from '../../types/board';
import Cell from '../cell/Cell';
import classes from './Board.module.scss';

interface IProps {}

const Board: React.FC<IProps> = () => {
    const board = useAppSelector((state) => state.gameReducer.board);
    return (
        <div className={classes.board}>
            {board?.map((row) => row.map((cell) => <Cell cell={cell} />))}
        </div>
    );
};
export default Board;
