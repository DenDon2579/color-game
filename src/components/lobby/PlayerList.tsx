import React from 'react';
import { useAppSelector } from '../../hooks/react-redux';
import Player from './Player';

const PlayerList: React.FC = () => {
    const lobby = useAppSelector((state) => state.lobbyReducer.lobby);
    return (
        <div>
            {lobby.map((player, index) => (
                <Player info={player} key={index} />
            ))}
        </div>
    );
};
export default PlayerList;
