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
import { setClientLobby } from '../../store/lobbyReducer';
import { useDispatch } from 'react-redux';
import { useGame } from '../../hooks/game-hooks';

const Lobby: React.FC = (props) => {
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.userReducer.info);
    const lobby = useLobby();
    const [serverLobby, loading] = useList(ref(database, 'lobby'));
    const joinLobby = () => {
        lobby.join();
    };

    const leaveLobby = () => {
        lobby.leave();
    };

    useEffect(() => {
        if (!loading) {
            const players = serverLobby?.map((i) => i.val());
            dispatch(setClientLobby(players as TLobby));
        }
    }, [serverLobby, dispatch, loading]);

    const toggleStatus = () => {
        lobby.toggleReady();
    };

    const isAllReady = () => {
        const players = serverLobby?.map((i) => i.val()) as IUser[];
        const playersCount = players.filter((i) => i.isInLobby).length;
        const readyPlayersCount = players.filter((i) => i.isReady).length;

        if (playersCount > 1) {
            return playersCount === readyPlayersCount;
        }
        return false;
    };

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
                    <button className={classes.button} onClick={toggleStatus}>
                        {user?.isReady
                            ? 'Перестать готовиться'
                            : 'Приготовиться'}
                    </button>
                </>
            ) : (
                <button className={classes.button} onClick={joinLobby}>
                    Присоединиться к лобби
                </button>
            )}
            {isAllReady() && <Navigate to='../game' />}
            <button
                className={classes.button}
                onClick={() => set(ref(database, 'lobby'), ['', '', '', ''])}
            >
                Remove all
            </button>
        </div>
    );
};
export default Lobby;
