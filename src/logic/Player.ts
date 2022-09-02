import { IPlayerInfo } from '../types/player';

export class Player {
    info: IPlayerInfo;

    constructor(player: IPlayerInfo) {
        this.info = player;
    }

    getInfo(): IPlayerInfo {
        return this.info;
    }

    setInfo(playerInfo: IPlayerInfo) {
        this.info = { ...playerInfo };
    }

    hurt() {
        if (this.info.hp) {
            this.info.hp--;
        }
        return this.info.hp;
    }

    kill() {
        this.info.isAlive = false;
        this.info.ownedCellsCount = 0;
    }
}
