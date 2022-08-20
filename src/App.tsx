import React, { useEffect } from 'react';

import Content from './components/content/Content';
import { useLobby } from './hooks/lobby-hooks';

function App() {
    const lobby = useLobby();
    useEffect(() => {
        window.addEventListener('unload', handleTabClosing);

        return () => {
            window.removeEventListener('unload', handleTabClosing);
        };
    });

    const handleTabClosing = () => {
        lobby.leave();
    };

    return (
        <>
            <Content />
        </>
    );
}

export default App;
