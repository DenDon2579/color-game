import { ref, set } from 'firebase/database';

import { database } from '../firestore';
import { IBoard, ICell } from '../types/board';

export function initBoard() {
    const cells: IBoard = [];
    for (let y = 0; y < 10; y++) {
        const row: ICell[] = [];
        for (let x = 0; x < 10; x++) {
            row.push({
                ownerId: '',
                ownerPhoto: '',
                coords: { x, y },
                changeable: false,
            });
        }
        cells.push(row);
    }

    set(ref(database, 'cells'), cells);
    return cells;
}

//
