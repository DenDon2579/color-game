import { BASES_CORDS } from '../constants';
import { ICellInfo, IPosition } from '../types/cell';
import { IPlayerInfo } from '../types/player';
import { Cell } from './cell';

export class Board {
    cells: Cell[][] = [];

    constructor(players: IPlayerInfo[]) {
        for (let y = 0; y < 10; y++) {
            const row = [];
            for (let x = 0; x < 10; x++) {
                row.push(this.createCell(x, y));
            }
            this.cells.push(row);
        }

        this.createPlayerBases(players);
    }

    setInfo(cellsInfo: ICellInfo[][]) {
        cellsInfo.forEach((row, y) =>
            row.forEach((cell, x) => this.cells[y][x].setInfo(cell))
        );
    }

    grabCell(ownerInfo: IPlayerInfo, position: IPosition) {
        const { x, y } = position;
        this.cells[y][x].changeOwner(ownerInfo);
    }

    createCell(x: number, y: number) {
        const cell: ICellInfo = {
            ownerCode: null,
            photoURL: null,
            changeable: true,
            color: null,
            position: {
                x: x,
                y: y,
            },
        };
        return new Cell(cell);
    }

    getInfo(): ICellInfo[][] {
        const cells = this.cells.map((row) =>
            row.map((cell) => cell.getInfo())
        );
        return cells;
    }

    createPlayerBases(players: IPlayerInfo[]): void {
        players.forEach((player, index) => {
            const { x, y } = BASES_CORDS[index];

            this.cells[y][x].setAsPlayerBase(
                player.playerCode,
                player.photoURL,
                player.color
            );
        });
    }
}
