export type IBoard = ICell[][];

export interface ICell {
    ownerId: string | null;
    ownerPhoto: string | null;
    coords: {
        x: number;
        y: number;
    };
}
