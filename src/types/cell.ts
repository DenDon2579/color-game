export interface ICellInfo {
    ownerCode: number | null;
    photoURL: string | null;
    changeable: boolean;
    color: string | null;
    position: IPosition;
}

export interface IPosition {
    x: number;
    y: number;
}
