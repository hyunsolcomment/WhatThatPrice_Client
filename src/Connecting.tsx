import Server from "./game/Server";
import {useLocation,useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function Connecting() {
    const { state } = useLocation();
    let navigate  = useNavigate();
    
    Server.whenJoin(() => {
        navigate("/game", { state: {ip: state.ip }});
    });

    // 서버 연결 시도
    useEffect(() => {
        if(state.ip) {
            Server.join(state.ip);
        } else {
            alert("올바르지 않은 접근입니다.");
            navigate("/");
        }
    },[]);

    return (
        <div className="connecting">
            <div>{ state.ip }에 연결 중..</div>
            <button onClick={() => Server.ping()}>테스트</button>
        </div>
    )
}

export default Connecting;