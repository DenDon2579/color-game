import { ICellInfo, IPosition } from '../types/cell';
import { IPlayerInfo } from '../types/player';

export class Cell {
    info: ICellInfo;

    constructor(cell: ICellInfo) {
        this.info = cell;
    }

    setInfo(cellInfo: ICellInfo) {
        this.info = { ...cellInfo };
    }

    isEnemyCell(currentPlayerCode: number) {
        if (
            this.info.ownerCode !== '' &&
            this.info.ownerCode !== currentPlayerCode
        ) {
            return true;
        }
        return false;
    }

    setAsPlayerBase(ownerCode: number, photoURL: string | null, color: string) {
        this.info.changeable = false;
        this.info.ownerCode = ownerCode;
        this.info.photoURL = photoURL;
        this.info.color = color;
    }

    changeOwner(owner: IPlayerInfo) {
        this.info = {
            ...this.info,
            ownerCode: owner.playerCode,
            color: owner.color,
        };
    }

    getInfo(): typeof this.info {
        return this.info;
    }
}
