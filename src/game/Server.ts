import axios from 'axios';
import IServerInfo from '../types/IServerInfo';
import { Socket,io } from 'socket.io-client';

export let socket: Socket;
let whenJoin: Function;

const Server = {
    whenJoin: (callback: Function) => whenJoin = callback,

    getInfo: async (ip: string): Promise<IServerInfo | undefined> => {
        try {

            const { data } = await axios.get(`http://${ip}/info`);
            console.log(data);

            return data && data.title && data.userNames ? {...data, isConnected: true } : { ip: ip, isConnected: false };

        } catch (e) {
            return { ip: ip, isConnected: false };
        }
    },

    join: (ip: string) => {
        if(socket && socket.connected) return false;
    
        socket = io(`http://${ip}`);
    
        socket.on('connection', () => {
            
            // 서버접속
    
            socket.on('message', (args) => {
                switch(args.action) {
                    case "join-ok":
                        whenJoin();
                        break;
                }
            });
        });
    },

    quit: () => {
        if(socket.connected) {
            socket.emit("message", {
                action: 'quit',
                token: window.localStorage.getItem("token")
            });
            socket.disconnect();
        }
    },

    ping: () => {
        socket.emit("message", {
            action: 'join',
            name:"유저 이름"
        });
    }
}

export default Server;