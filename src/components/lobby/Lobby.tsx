import React, { useEffect } from 'react';
import classes from './Lobby.module.scss';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    orderBy,
    query,
    Timestamp,
    updateDoc,
} from 'firebase/firestore';
import { firebaseApp, fireStoreBase } from '../..';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Player from './Player';
import { IUser } from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { getDatabase, ref, remove, set } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import {
    addPlayerToLobby,
    removePlayerFromLobby,
    setLobby,
    toggleReadyStatus,
} from '../../store/gameReducer';
import PlayerList from './PlayerList';
import { TLobby } from '../../types/lobby';
import { Link } from 'react-router-dom';

const Lobby: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.gameReducer.user.info);
    const database = getDatabase(firebaseApp);
    const [serverLobby, loading, error] = useList(ref(database, 'lobby'));

    const joinLobby = () => {
        if (user) {
            const data: IUser = {
                displayName: user.displayName,
                photoURL: user.photoURL,
                userID: user.userID,
                isReady: false,
                isInLobby: true,
            };
            dispatch(addPlayerToLobby(data));
        }
    };

    const leaveLobby = () => {
        if (user?.userID) {
            dispatch(removePlayerFromLobby(user.userID));
        }
    };

    useEffect(() => {
        const lobby = serverLobby?.map((i) => i.val());
        dispatch(setLobby(lobby as TLobby));
    }, [serverLobby, loading, dispatch]);

    function deleteAll() {
        set(ref(database, 'lobby'), ['', '', '', '']);
    }

    const toggleStatus = () => {
        if (user?.userID) {
            dispatch(toggleReadyStatus(user.userID));
        }
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
            {isAllReady() ? <h2>da</h2> : <h2>net</h2>}
        </div>
    );
};
export default Lobby;
