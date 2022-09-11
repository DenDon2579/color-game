import React from 'react';
import { TURNS_PRESETS } from '../../../static/constants';
import Button from '../../../ui/buttons/Button';

interface IProps {
    start: (turns: number) => void;
}

const TurnsForm: React.FC<IProps> = ({ start }) => {
    return (
        <div>
            {TURNS_PRESETS.map((turns) => (
                <Button
                    marginLR={15}
                    type='rounded'
                    key={turns}
                    onClick={() => start(turns)}
                >
                    {turns}
                </Button>
            ))}
        </div>
    );
};

export default TurnsForm;
