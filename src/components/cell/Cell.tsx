import React, { MouseEvent, useEffect, useState } from 'react';

import { ICellInfo, IPosition } from '../../types/cell';
import classes from './Cell.module.scss';

interface IProps {
    cell: ICellInfo;
    grabCell: (position: IPosition) => void;
}

const Cell: React.FC<IProps> = ({ cell, grabCell }) => {
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (cell.color) {
            setStyle({
                cursor: 'pointer',
                background: cell.color,
                boxShadow: `0px 0px 5px ${cell.color}, 0px 0px 5px ${cell.color}`,
            });
        }
    }, [cell.color]);

    const grab = (e: MouseEvent) => {
        if (e.buttons) {
            grabCell(cell.position);
        }
    };
    return (
        <div
            onMouseOver={grab}
            onMouseDown={() => grabCell(cell.position)}
            className={classes.cell}
            style={style}
        >
            {cell.photoURL && <img src={cell.photoURL} alt='' />}
        </div>
    );
};
export default Cell;
