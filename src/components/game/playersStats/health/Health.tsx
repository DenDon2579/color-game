import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faHeart as faSolHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons';
import classes from './Health.module.scss';

interface IProps {
    hp: number | '';
}

const Health: React.FC<IProps> = ({ hp }) => {
    switch (hp) {
        case 3:
            return (
                <>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faSolHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faSolHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faSolHeart}
                    />
                </>
            );
        case 2:
            return (
                <>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faSolHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faSolHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faRegHeart}
                    />
                </>
            );
        case 1:
            return (
                <>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faSolHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faRegHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faRegHeart}
                    />
                </>
            );
        case 0:
            return (
                <>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faRegHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faRegHeart}
                    />
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faRegHeart}
                    />
                </>
            );
        default:
            return <></>;
    }
};
export default Health;
