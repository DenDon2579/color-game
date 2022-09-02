import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useLobby } from '../../../hooks/lobby-hooks';
import { IPlayerInfo } from '../../../types/player';
import PlayersStats from '../playersStats/PlayersStats';
import classes from './GameOver.module.scss';

interface IProps {
    players: IPlayerInfo[];
}

const GameOver: React.FC<IProps> = (props) => {
    const lobby = useLobby();
    const navigate = useNavigate();
    return (
        <>
            <h2>Игра окончена</h2>
            <PlayersStats players={props.players} />

            <span
                onClick={() => {
                    lobby.leave();
                    navigate('../lobby');
                }}
            >
                Назад
            </span>
        </>
    );
};
export default GameOver;
