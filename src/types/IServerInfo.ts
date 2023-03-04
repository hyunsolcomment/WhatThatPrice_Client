export default interface IServerInfo {
    ip: string,
    isConnected: boolean,
    title?: string
    userNames?: string[],
    inGame?: boolean
}