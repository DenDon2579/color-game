import { BASES_CORDS, COLORS } from '../constants';
import { IBoardInfo } from '../types/board';
import { ICellInfo, IPosition } from '../types/cell';
import { IGameInfo } from '../types/game';

import { TLobby } from '../types/lobby';
import { IPlayerInfo } from '../types/player';
import { Board } from './board';
import { Player } from './player';

export class Game {
    info: IGameInfo;
    players: Player[];
    board: Board | null;

    constructor() {
        this.info = {
            isPlaying: false,
            turn: '',
        };
        this.board = null;
        this.players = [];
    }

    start() {
        this.info = {
            isPlaying: true,
            turn: 0,
        };
    }

    grabCell(position: IPosition): boolean {
        const { x, y } = position;
        if (this.info.turn !== '') {
            const movingPlayerInfo = this.players[this.info.turn].getInfo();
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
                return true;
            }
        }
        return false;
    }

    setInfo(gameInfo: IGameInfo) {
        this.info = { ...gameInfo };
    }

    setPlayersInfo(playersInfo: IPlayerInfo[]) {
        playersInfo.forEach((playerInfo, index) =>
            this.players[index].setInfo(playerInfo)
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
            const playerCount = this.players.length;

            if (this.info.turn < playerCount - 1) {
                this.info.turn += 1;
            } else {
                this.info.turn = 0;
            }
        }
    }

    createPlayers(lobby: TLobby) {
        const players = lobby.filter((player) => player !== '');
        players.forEach((player, index) => {
            if (player) {
                const playerInfo: IPlayerInfo = {
                    displayName: player.displayName,
                    photoURL: player.photoURL,
                    color: COLORS[index],
                    playerCode: index,
                    userID: player.userID,
                    ownedCells: [],
                };
                this.players.push(new Player(playerInfo));
            }
        });
    }

    createBoard() {
        this.board = new Board(this.getPlayersInfo());
    }

    // setPlayerBases() {
    //     this.players.map((player, index) => {
    //         const { x, y } = BASES_CORDS[index];
    //         if (this.board) {
    //             player.info = {
    //                 ...player.info,
    //                 ownedCells: [this.board.getInfo()[y][x]],
    //             };
    //         }
    //     });
    // }
}
