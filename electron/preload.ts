import { contextBridge } from "electron";
import Game from "./module/Game";

contextBridge.exposeInMainWorld('api', {
    init: async () => Game.init(),
    getServers: (): string[] => Game.servers,
    addServer: async (ip: string) => await Game.addServer(ip),
    editServer: async (index: number, ip: string) => await Game.editServer(index, ip),
    removeServer: async (index: number) => await Game.removeServer(index),
    loadServers: async() => await Game.loadServers()
});