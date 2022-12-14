import { ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { useList } from 'react-firebase-hooks/database';
import Content from './components/content/Content';
import { database } from './firestore';
import { useLobby } from './hooks/lobby-hooks';
import { useAppDispatch } from './hooks/react-redux';
import { setClientLobby } from './store/lobbyReducer';
import { TLobby } from './types/lobby';

function App() {
    const dispatch = useAppDispatch();
    const lobby = useLobby();
    const [serverLobby, loading] = useList(ref(database, 'lobby'));

    useEffect(() => {
        if (!loading) {
            const players = serverLobby?.map((i) => i.val());
            dispatch(setClientLobby(players as TLobby));
        }
    }, [serverLobby, dispatch, loading]);

    useEffect(() => {
        window.addEventListener('unload', lobby.leave);

        return () => {
            window.removeEventListener('unload', lobby.leave);
        };
    });

    return (
        <>
            <Content />
        </>
    );
}

export default App;
