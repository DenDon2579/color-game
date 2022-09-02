import { isThisTypeNode } from 'typescript';
import {
    BASES_CORDS,
    COLORS,
    TOTAL_TURNS,
    VULNERABLE_CORDS,
} from '../constants';
import gameReducer from '../store/gameReducer';
import { IBoardInfo } from '../types/board';
import { ICellInfo, IPosition } from '../types/cell';
import { IGameInfo } from '../types/game';

import { TLobby } from '../types/lobby';
import { IPlayerInfo } from '../types/player';
import { Board } from './Board';
import { Player } from './Player';

export class Game {
    info: IGameInfo;
    players: Player[];
    board: Board | null;

    constructor() {
        this.info = {
            status: 'notPlaying',
            turn: '',
            cellsCount: 0,
            turnsCount: 0,
            playersCodes: [],
        };
        this.board = null;
        this.players = [];
    }

    init() {
        this.info = {
            status: 'notPlaying',
            turn: '',
            cellsCount: 0,
            turnsCount: 0,
            playersCodes: [],
        };
        this.board = null;
        this.players = [];
    }

    start() {
        this.info = {
            ...this.info,
            status: 'playing',
            turn: 0,
            cellsCount: this.getRandomCellsCount(),
            turnsCount: 1,
        };
    }
    getPlayerCode(turn: number): number {
        return this.info.playersCodes[turn];
    }

    grabCell(position: IPosition): boolean {
        const { x, y } = position;
        if (this.info.turn !== '') {
            const playerCode = this.getPlayerCode(this.info.turn);
            const movingPlayerInfo = this.players[playerCode].getInfo();
            const cells = this.board?.getInfo();
            if (
                cells?.[y]?.[x]?.changeable &&
                cells?.[y]?.[x]?.ownerCode !== movingPlayerInfo.playerCode &&
                (cells?.[y + 1]?.[x]?.ownerCode ===
                    movingPlayerInfo.playerCode ||
                    cells?.[y]?.[x + 1]?.ownerCode ===
                        movingPlayerInfo.playerCode ||
                    cells?.[y - 1]?.[x]?.ownerCode ===
                        movingPlayerInfo.playerCode ||
                    cells?.[y]?.[x - 1]?.ownerCode ===
                        movingPlayerInfo.playerCode)
            ) {
                this.board?.grabCell(movingPlayerInfo, position);
                this.setPlayersCellsCount();
                this.info.cellsCount--;
                return true;
            }
        }
        return false;
    }

    setInfo(gameInfo: IGameInfo) {
        this.info = { ...gameInfo };
    }

    setPlayersInfo(playersInfo: IPlayerInfo[]) {
        playersInfo.forEach(
            (playerInfo, index) =>
                this.players[index] && this.players[index].setInfo(playerInfo)
        );
    }

    setBoardInfo(boardInfo: IBoardInfo) {
        this.board?.setInfo(boardInfo);
    }

    getPlayersInfo(): IPlayerInfo[] {
        return this.players.map((player) => player.getInfo());
    }

    getInfo(): typeof this.info {
        return this.info;
    }

    getBoardInfo(): ICellInfo[][] | null {
        if (this.board) {
            return this.board.getInfo();
        }
        return null;
    }

    nextTurn() {
        if (this.info.turn !== '') {
            const playersCount = this.info.playersCodes.length;

            if (this.info.turn < playersCount - 1) {
                this.info.turn += 1;
            } else {
                this.info.turn = 0;
            }

            this.info.cellsCount = this.getRandomCellsCount();
            if (this.info.turn === 0) {
                this.info.turnsCount += 1;
            }
        }
    }

    hurtPlayer(turn: number) {
        const playerCode = this.getPlayerCode(turn);
        const newHp = this.players[playerCode].hurt();
        if (newHp === 0) {
            this.killPlayer(playerCode);
        }
    }

    killPlayer(turn: number) {
        const playerCode = this.getPlayerCode(turn);
        this.players[playerCode].kill();
        this.info.playersCodes = this.info.playersCodes.filter(
            (code) => code !== playerCode
        );
        this.board?.clearDeathPlayerCells(playerCode);
        if (this.info.playersCodes.length < 2) {
            this.finish();
        } else {
            this.nextTurn();
        }
    }

    isBaseCaptured(turn: number) {
        const playerCode = this.getPlayerCode(turn);
        const vulnerableCords = VULNERABLE_CORDS[playerCode];
        const checkResult = vulnerableCords.map((cell) =>
            this.board?.cells[cell.y][cell.x].isEnemyCell(playerCode)
        );
        return !checkResult.includes(false);
    }

    finish() {
        this.board = null;
        this.info = {
            status: 'finished',
            turn: '',
            cellsCount: 0,
            turnsCount: 0,
            playersCodes: [],
        };
    }

    createPlayers(lobby: TLobby) {
        const players = lobby.filter((player) => player !== '');
        this.info.playersCodes = players.map((_, code) => code);
        players.forEach((player, index) => {
            if (player) {
                const playerInfo: IPlayerInfo = {
                    displayName: player.displayName,
                    photoURL: player.photoURL,
                    color: COLORS[index],
                    playerCode: index,
                    userID: player.userID,
                    ownedCellsCount: 1,
                    isAlive: true,
                    hp: 3,
                };
                this.players.push(new Player(playerInfo));
            }
        });
    }

    createBoard() {
        this.board = new Board(this.getPlayersInfo());
    }

    getRandomCellsCount(): number {
        const min = 1;
        const max = 5;
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    setPlayersCellsCount() {
        const board = this.board?.getInfo().flat();

        if (board) {
            this.getPlayersInfo().forEach((player) => {
                const cellsCount = board.reduce((acc: number, item): number => {
                    if (item.ownerCode === player.playerCode) {
                        return ++acc;
                    }
                    return acc;
                }, 0);
                this.players[player.playerCode].info.ownedCellsCount =
                    cellsCount;
            });
        }
    }
}
