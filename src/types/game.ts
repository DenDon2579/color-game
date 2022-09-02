export interface IGameInfo {
    status: 'notPlaying' | 'playing' | 'finished';
    turn: number | '';
    cellsCount: number;
    turnsCount: number;
    playersCodes: number[];
}
