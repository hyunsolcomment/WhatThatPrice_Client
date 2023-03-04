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
    addServer: (ip: string) => Promise<void>,
    editServer: (index: number, ip: string) => Promise<void>,
    removeServer: (index: number) => Promise<void>,
    loadServers: () => Promise<void>,
    saveServers: () => Promise<void>,
    init: () => Promise<void>
}

const Game: IGame = {

    /**
     * 이 게임 데이터가 저장되는 폴더
     */
    folder: `C:/Users/${os.userInfo().username}/AppData/Local/WhatThatPrice`,

    // 서버주소들
    servers: [],
    
    // 내 프로필 정보
    profile: {},

    // 서버주소 추가
    addServer: async (ip: string) => {
        Game.servers.push(ip);
        await Game.saveServers();
    },

    // 서버주소 제거
    removeServer: async (index: number) => {
        Game.servers.splice(index, 1);
        await Game.saveServers();
    },

    // 수정
    editServer: async (index: number, ip: string) => {
        Game.servers[index] = ip;
        await Game.saveServers();
    },

    // 서버 주소들 불러오기
    loadServers: async () => {
        
        // 서버주소 JSON 파일 불러오기
        let str = await fs.readFile(Game.folder+"/servers.json", {encoding:"utf-8"});
        Game.servers = JSON.parse(str);

        console.log(`${Game.servers.length}개의 서버주소를 불러왔습니다.`);
    },

    // 서버주소들 저장하기
    saveServers: async () => {
        await fs.writeFile(Game.folder+"/servers.json", JSON.stringify(Game.servers));
        console.log(`${Game.servers.length}개의 서버주소를 저장했습니다.`);
    },

    // 프로그램 초기 설정
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