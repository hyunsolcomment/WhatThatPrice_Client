import * as fs from 'fs/promises';
import * as os from 'os';
import { existFolder } from './Folder';

interface IProfile {
    name?: string,
    image?: string
}

interface IGame {
    folder: string,
    servers: string[],
    profile: IProfile,
    loadServers: () => Promise<void>,
    saveServers: () => Promise<void>,
    init: () => Promise<void>
}

const Game: IGame = {
    folder: `C:/Users/${os.userInfo().username}/AppData/Local/WhatThatPrice`,
    servers: [],
    profile: {},
    loadServers: async () => {
        
        // 서버주소 JSON 파일 불러오기
        let str = await fs.readFile(Game.folder+"/servers.json", {encoding:"utf-8"});
        Game.servers = JSON.parse(str);
    },

    saveServers: async () => {
        await fs.writeFile(Game.folder+"/servers.json", JSON.stringify(Game.servers));
    },

    init: async () => {

        // 폴더 생성
        if(!await existFolder(Game.folder)) {
            await fs.mkdir(Game.folder);
            await fs.mkdir(Game.folder+"/image");

            // 설정 JSON 파일
            await fs.writeFile(Game.folder+"/settings.json", "{}");

            // 서버주소 JSON 파일
            await fs.writeFile(Game.folder+"/servers.json","[]");
        }
    }
}

export default Game;