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
        this.info = playerInfo;
    }
}
