import { contextBridge } from "electron";
import Game from "./module/Game";

contextBridge.exposeInMainWorld('api', {
    init: async () => Game.init(),
    getServers: (): string[] => Game.servers,
    addServer: (ip: string) => Game.servers.push(ip),
    removeServer: (index: number) => Game.servers.splice(index, 1)
});