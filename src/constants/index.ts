export const COLORS: string[] = ['#FA58B6', '#ffee77', '#1cd6ce', '#e64848'];

export const BASES_CORDS = [
    { x: 0, y: 0 },
    { x: 9, y: 9 },
    { x: 9, y: 0 },
    { x: 0, y: 9 },
];

export const VULNERABLE_CORDS = [
    [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ],
    [
        { x: 8, y: 9 },
        { x: 9, y: 8 },
        { x: 8, y: 8 },
    ],
    [
        { x: 8, y: 0 },
        { x: 9, y: 1 },
        { x: 8, y: 1 },
    ],
    [
        { x: 1, y: 9 },
        { x: 0, y: 8 },
        { x: 1, y: 8 },
    ],
];

export const TURNS_PRESETS = [25, 50, 75, 100];
