import axios from 'axios';
import IServerInfo from '../types/IServerInfo';

const Server = {
    getInfo: async (ip: string): Promise<IServerInfo | undefined> => {
        try {

            const { data } = await axios.get(`http://${ip}/info`);
            console.log(data);

            return data && data.title && data.userNames ? {...data, isConnected: true } : { ip: ip, isConnected: false };

        } catch (e) {
            return { ip: ip, isConnected: false };
        }
    }
}

export default Server;