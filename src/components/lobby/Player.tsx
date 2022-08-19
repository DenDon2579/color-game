import React from 'react';
import { IUser } from '../../types/user';
import classes from './Player.module.scss';

interface IProps {
    info: IUser | '';
}

const Player: React.FC<IProps> = ({ info }) => {
    return (
        <div className={classes.player}>
            {info ? (
                <div className={classes.playerInfo}>
                    <div className={classes.avatar}>
                        <img
                            src={info.photoURL ? info.photoURL : ''}
                            alt='avatar'
                        />
                    </div>
                    <div className={classes.name}>
                        <span>{info.displayName}</span>
                    </div>
                    <div className={classes.status}>
                        <span>{info.isReady ? 'готов' : 'не готов'}</span>
                    </div>
                </div>
            ) : (
                <span>Пусто</span>
            )}
        </div>
    );
};
export default Player;
