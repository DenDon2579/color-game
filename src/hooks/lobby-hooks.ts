import { ref, set } from 'firebase/database';
import { database } from '../firestore';
import { setIsInLobbyStatus, setReadyStatus } from '../store/userReducer';
import { TLobby } from '../types/lobby';
import { IUser } from '../types/user';
import { useAppDispatch, useAppSelector } from './react-redux';

export const useLobby = () => {
    const lobby = useAppSelector((state) => state.lobbyReducer.lobby);
    const user = useAppSelector((state) => state.userReducer.info);
    const dispatch = useAppDispatch();

    const methods = {
        join() {
            if (user && lobby) {
                const tempLobby = [...lobby] as TLobby;
                const tempUser = { ...user };
                tempUser.isInLobby = true;
                tempUser.isReady = false;
                const emptyIndex = tempLobby.findIndex((i) => i === '');
                const isAlreadyInLobby = tempLobby.findIndex((i) => {
                    if (i) {
                        return i.userID === user.userID;
                    }
                });
                if (emptyIndex !== -1 && isAlreadyInLobby === -1) {
                    tempLobby[emptyIndex] = tempUser;
                    setServerLobby(tempLobby).then(() => {
                        dispatch(setIsInLobbyStatus(true));
                        dispatch(setReadyStatus(false));
                    });
                }
            }
        },
        leave() {
            if (user?.userID) {
                const tempLobby = [...lobby];

                const userIndex = tempLobby.findIndex((i) => {
                    if (i) {
                        return i.userID === user.userID;
                    }
                });

                if (userIndex !== -1) {
                    tempLobby[userIndex] = '';
                }

                setServerLobby(tempLobby).then(() => {
                    dispatch(setIsInLobbyStatus(false));
                    dispatch(setReadyStatus(false));
                });
            }
        },

        toggleReady() {
            const tempLobby = [...lobby] as IUser[];
            const userIndex = tempLobby.findIndex((i) => {
                if (i && user) {
                    return i.userID === user.userID;
                }
                return false;
            });
            console.log(tempLobby[userIndex]);

            tempLobby[userIndex] = {
                ...tempLobby[userIndex],
                isReady: !tempLobby[userIndex].isReady,
            };

            setServerLobby(tempLobby).then(() => {
                dispatch(setReadyStatus(tempLobby[userIndex].isReady));
            });
        },
    };
    return methods;
};

const setServerLobby = (lobby: TLobby) => {
    return set(ref(database, 'lobby'), lobby);
};
