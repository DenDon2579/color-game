export type IBoard = ICell[][];

export interface ICell {
    ownerId: string | null;
    ownerPhoto: string | null;

    changeable: boolean;
    coords: {
        x: number;
        y: number;
    };
}
