import { getDatabase, ref, set } from 'firebase/database';
import { firebaseApp } from '..';

export function initBoard() {
    const cells = [];
    for (let y = 0; y < 10; y++) {
        const row = [];
        for (let x = 0; x < 10; x++) {
            row.push({
                ownerId: '',
                ownerPhoto: '',
                coords: { x, y },
            });
        }
        cells.push(row);
    }
    const database = getDatabase(firebaseApp);
    set(ref(database, 'cells'), cells);
    return cells;
}

//  [
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
//     [
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//         { ownerId: null, ownerPhoto: null, coords: { x: 0, y: 0 } },
//     ],
// ];
