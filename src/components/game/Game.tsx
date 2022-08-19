import { getDatabase, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { useList } from 'react-firebase-hooks/database';
import { firebaseApp } from '../..';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { initBoard } from '../../logic/game';
import { setBoard } from '../../store/gameReducer';
import { IBoard } from '../../types/board';
import Board from '../board/Board';
import classes from './Game.module.scss';

const Game: React.FC = () => {
    const dispatch = useAppDispatch();

    const database = getDatabase(firebaseApp);
    const [snapshots, loading, error] = useList(ref(database, 'cells'));
    const serverBoard = snapshots?.map((i) => i.val());
    useEffect(() => {
        dispatch(setBoard(serverBoard as IBoard));
    }, [serverBoard, dispatch]);

    function newGame() {
        initBoard();
    }

    return (
        <div className={classes.game}>
            <button onClick={newGame}>Start new game</button>
            <Board />
        </div>
    );
};
export default Game;
