import { useEffect,useState } from "react";
import Server from "./game/Server";
import IServerInfo from "./types/IServerInfo";

export default function ServerItem(props: {ip: string, index: number, setServers: Function, servers: string[] }) {
    const [ info, setInfo ] = useState<IServerInfo>();
    const [input,setInput] = useState<string>(props.ip);

    const originIP = props.ip;

    useEffect(() => {
        Server.getInfo(props.ip).then(info => setInfo(info));
    },[]);

    const keydownHandler = ({ target, key } : React.KeyboardEvent<HTMLElement>) => {
        const _target = target as HTMLElement;
        const isIpInput = _target.className.includes("ip");

        if(key === 'Enter') {
            if(isIpInput) {
                // 서버주소 수정
            }
        }

        else if(key === 'Escape') {
            if(isIpInput) {
                (_target as HTMLInputElement).value = originIP;
            }
        }
    };

    const deleteMe = async () => {
        console.log(`삭제할 index; ${props.index}`);
        await window.api.removeServer(props.index);
        window.location.reload();
    }

    return (
        <div>
            {
                // 연결 시도 중임
                !info &&
                <>
                    <div className="status circle bg-gray fl-right"></div>
                    <div className="title">서버에게 정보를 달라고 조르고 있습니다..</div>
                    <div className="users"></div>
                    <input className="ip bg-default" defaultValue={props.ip} placeholder="여기에 서버주소를 입력해주세요." />
                </>
            }
            {
                info && 
                <>
                    <div className={"status circle fl-right "+( info.isConnected ? " bg-lime" : " bg-red")}></div>
                    <div className="title">{ info.isConnected ? info.title : "서버에 연결할 수 없습니다." }</div>
                    <div className="users">{ info.isConnected ? info.userNames?.length : 0 }명 접속 중</div>
                    
                    <button className="fl-right fs-12 fc-black remove-btn" onClick={deleteMe}>삭제</button>
                    <input className="ip bg-default" value={input} onKeyDown={keydownHandler} onChange={ (e) => setInput(e.target.value) } placeholder="여기에 서버주소를 입력해주세요." />
                </>
            }
        </div>
    )
}