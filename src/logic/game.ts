import { BASES_CORDS, COLORS } from '../constants';
import { IBoardInfo } from '../types/board';
import { ICellInfo, IPosition } from '../types/cell';
import { IGameInfo } from '../types/game';

import { TLobby } from '../types/lobby';
import { IPlayerInfo } from '../types/player';
import { Board } from './Board';
import { Player } from './Player';

export default class Game {
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

    grabCell(position: IPosition) {
        if (this.info.turn !== '') {
            const ownerInfo = this.players[this.info.turn].getInfo();
            this.board?.grabCell(ownerInfo, position);
        }
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
