import React, { MouseEvent, useEffect, useState } from 'react';

import { ICellInfo, IPosition } from '../../types/cell';
import classes from './Cell.module.scss';

interface IProps {
    cell: ICellInfo;
    grabCell: (position: IPosition) => void;
}

const Cell: React.FC<IProps> = ({ cell, grabCell }) => {
    const color = cell.color;
    let style = {};
    if (cell.color) {
        style = {
            background: cell.color,
            backgroundSize: 'cover',
            boxShadow: `0px 0px 5px ${cell.color}, 0px 0px 5px ${cell.color}`,
        };
    }
    return (
        <div
            onClick={() => grabCell(cell.position)}
            className={classes.cell}
            style={style}
        >
            {cell.photoURL && <img src={cell.photoURL} alt='' />}
        </div>
    );
};
export default Cell;
