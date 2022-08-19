import React, { useEffect } from 'react';
import { ref, getDatabase, set } from 'firebase/database';
import { useList, useObjectVal } from 'react-firebase-hooks/database';
import { firebaseApp } from '.';
import Game from './components/game/Game';
import Content from './components/content/Content';
import { useAppDispatch, useAppSelector } from './hooks/react-redux';
import { removePlayerFromLobby } from './store/gameReducer';

function App() {
    const userID = useAppSelector(
        (state) => state.gameReducer.user.info?.userID
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        window.addEventListener('unload', handleTabClosing);
        return () => {
            window.removeEventListener('unload', handleTabClosing);
        };
    });

    const handleTabClosing = () => {
        if (userID) {
            dispatch(removePlayerFromLobby(userID));
        }
    };

    return (
        <>
            <Content />
        </>
    );
}

export default App;
