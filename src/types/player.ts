import { ICellInfo } from './cell';

export interface IPlayerInfo {
    displayName: string | null;
    photoURL: string | null;
    color: string;
    playerCode: number;
    userID: string;
    ownedCells: ICellInfo[];
}
