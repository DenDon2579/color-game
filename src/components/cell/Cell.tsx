import React from 'react';

import { ICell } from '../../types/board';
import classes from './Cell.module.scss';

interface IProps {
    cell: ICell;
}

const Cell: React.FC<IProps> = ({ cell }) => {
    return (
        <div className={classes.cell}>
            {cell.coords.x}:{cell.coords.y}
        </div>
    );
};
export default Cell;
