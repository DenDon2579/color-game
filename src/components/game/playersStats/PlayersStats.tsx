import {
    faCrown,
    faHeart as faSolidHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IPlayerInfo } from '../../../types/player';
import classes from './PlayersStats.module.scss';
import Health from './health/Health';

interface IProps {
    players: IPlayerInfo[];
}

const PlayersStats: React.FC<IProps> = (props) => {
    const players = [...props.players];
    players.sort(
        (playerA, playerB) => playerB.ownedCellsCount - playerA.ownedCellsCount
    );

    const hightestCode = players[0] ? players[0].playerCode : null;

    return (
        <div className={classes.wrapper}>
            {players.map((player) => (
                <div
                    className={classes.stats}
                    key={player.userID}
                    style={{
                        filter: !player.isAlive ? 'brightness(0.5)' : 'none',
                    }}
                >
                    <div
                        className={classes.statsCell}
                        style={{ backgroundColor: player.color }}
                    >
                        <img
                            src={player.photoURL ? player.photoURL : ''}
                            alt=''
                        />
                    </div>
                    <div className={classes.statsText}>
                        <div className={classes.top}>
                            <span>
                                {player.displayName}
                                {player.playerCode === hightestCode && (
                                    <FontAwesomeIcon
                                        className={classes.crown}
                                        icon={faCrown}
                                    />
                                )}
                            </span>
                        </div>
                        <div className={classes.bottom}>
                            <Health hp={player.hp} />
                        </div>
                    </div>
                    <div className={classes.lifes}>
                        {player.ownedCellsCount}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default PlayersStats;
