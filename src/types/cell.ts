export interface ICellInfo {
    ownerCode: number | '';
    photoURL: string | null;
    changeable: boolean;
    color: string | null;
    position: IPosition;
}

export interface IPosition {
    x: number;
    y: number;
}
