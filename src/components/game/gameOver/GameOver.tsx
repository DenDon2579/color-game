import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className={classes.wrapper}>
            <h2>Игра окончена</h2>
            <PlayersStats players={props.players} />

            <button
                className={classes.button}
                onClick={() => {
                    lobby.leave();
                    navigate('../lobby');
                }}
            >
                Вернуться в лобби
            </button>
        </div>
    );
};
export default GameOver;
