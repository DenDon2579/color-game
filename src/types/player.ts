import { ICellInfo } from './cell';

export interface IPlayerInfo {
    displayName: string | '';
    photoURL: string | '';
    color: string;
    playerCode: number;
    userID: string;
    ownedCellsCount: number;
    isAlive: boolean;
    hp: number | '';
}
