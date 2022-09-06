import React from 'react';
import { TURNS_PRESETS } from '../../../constants';
import classes from './TurnsForm.module.scss';

interface IProps {
    start: (turns: number) => void;
}

const TurnsForm: React.FC<IProps> = ({ start }) => {
    return (
        <div>
            {TURNS_PRESETS.map((turns) => (
                <button className={classes.button} onClick={() => start(turns)}>
                    {turns}
                </button>
            ))}
        </div>
    );
};

export default TurnsForm;
