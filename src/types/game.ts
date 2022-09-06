export interface IGameInfo {
    cellsCount: number;
    status: 'notPlaying' | 'playing' | 'finished';
    totalTurns: number;
    turn: number | '';
    turnsCount: number;
    playersCodes: number[];
}
