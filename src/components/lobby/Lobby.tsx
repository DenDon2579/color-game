import React, { useEffect } from 'react';
import classes from './Lobby.module.scss';

import { IUser } from '../../types/user';
import { useAppSelector } from '../../hooks/react-redux';
import { ref, remove, set } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';

import PlayerList from './PlayerList';
import { TLobby } from '../../types/lobby';
import { Navigate } from 'react-router-dom';
import { database } from '../../firestore';
import { useLobby } from '../../hooks/lobby-hooks';
import lobbyReducer, { setClientLobby } from '../../store/lobbyReducer';
import { useDispatch } from 'react-redux';
import { useGame } from '../../hooks/game-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

const Lobby: React.FC = (props) => {
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.userReducer.info);
    const usersInLobby = useAppSelector((state) => state.lobbyReducer.lobby);
    const gameStatus = useAppSelector(
        (state) => state.gameReducer.game?.status
    );
    const lobby = useLobby();

    const joinLobby = () => {
        lobby.join();
    };

    const leaveLobby = () => {
        lobby.leave();
    };

    const toggleStatus = () => {
        lobby.toggleReady();
    };

    const isAllReady = () => {
        if (usersInLobby && user?.isInLobby) {
            const playersCount = usersInLobby.filter((i) =>
                i !== '' ? i.isInLobby : false
            ).length;
            const readyPlayersCount = usersInLobby.filter((i) =>
                i !== '' ? i.isReady : false
            ).length;

            if (playersCount > 1) {
                return playersCount === readyPlayersCount;
            }
        }
        return false;
    };

    if (gameStatus !== 'playing') {
        return (
            <div className={classes.lobby}>
                <div className={classes.header}>
                    <span>Лобби</span>
                </div>
                <PlayerList />

                {user?.isInLobby ? (
                    <>
                        <button className={classes.button} onClick={leaveLobby}>
                            Покинуть лобби
                        </button>
                        <button
                            className={classes.button}
                            onClick={toggleStatus}
                        >
                            {user?.isReady
                                ? 'Перестать готовиться'
                                : 'Приготовиться'}
                        </button>
                    </>
                ) : (
                    <button className={classes.button} onClick={joinLobby}>
                        Присоединиться к лобби{' '}
                        <FontAwesomeIcon
                            className={classes.icon}
                            icon={faCirclePlay}
                        />
                    </button>
                )}
                {isAllReady() && <Navigate to='../game' />}
                <button
                    className={classes.button}
                    onClick={() =>
                        set(ref(database, 'lobby'), ['', '', '', ''])
                    }
                >
                    Очистить лобби
                </button>
            </div>
        );
    } else {
        return <h2>ИГРА УЖЕ ИДЁТ</h2>;
    }
};
export default Lobby;
