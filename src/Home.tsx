import './css/home.css';
import { useEffect,useState,useRef } from 'react';
import ServerItem from './ServerItem';
import {Navigate, useNavigate} from 'react-router-dom';

declare global {
  interface Window {
    api?: any;
  }
}

function Home() {
  let navigate = useNavigate();
  const [ servers, setServers ] = useState<string[]>();
  const serverInputRef = useRef<HTMLInputElement>(null);
  const [ serverAddMode, setServerAddMode ] = useState<boolean>();

  useEffect(() => {

    // 서버주소 로드
    const load = async () => {
      await window.api.init();
      await window.api.loadServers();

      setServers(window.api.getServers());
    }

    load();
  }, []);

  const clickHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    switch(target.id) {
      // 서버추가
      case "server-add-btn":
        if(serverInputRef.current) {
          const ip = serverInputRef.current.value;

          if(ip.length > 0) { 
            await window.api.addServer(ip);
            setServers([...window.api.getServers()]);

          }
        }
        break;

      // 서버추가 취소
      case "server-add-cancel-btn":
        setServerAddMode(false);
        break;
    }
  }

  const joinServer = (ip: string) => {
    navigate("/connecting", { state: {ip:ip} });
  }
  
  return (
    <div className="Home">

      <div className="header">
        <div className="logo bold">WhatThatPrice</div>
        <div className="user-image">
          <img src="img/TestProfileImage.png" />
        </div>
      </div>

      <div className="server-list">
        {
          // 서버 목록 출력하기 
          servers?.map((ip,i) => {
            return (
              <div key={i} onClick={() => joinServer(ip)}>
                <ServerItem ip={ip} index={i} setServers={setServers} servers={servers}/>
              </div>
            )
          })
        }
        {
          !serverAddMode &&
          <div className="text-center hover-bg" onClick={() => setServerAddMode(true)}>+</div>
        }
        {
          serverAddMode &&
          <div id="server-add">
            <input className="server-input" ref={serverInputRef} placeholder="여기에 서버주소를 입력해주세요." />
            <div className="server-add fl-right">
              <button id="server-add-btn" className="fs-12 ml-5" onClick={clickHandler}>추가</button>
              <button id="server-add-cancel-btn" className="fs-12 ml-5" onClick={clickHandler}>취소</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
