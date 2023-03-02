import './css/home.css';
import { useEffect,useState } from 'react';

declare global {
  interface Window {
    api?: any;
  }
}

function App() {
  const [ servers, setServers ] = useState<string[]>();
  const [ serverInput, setServerInput ] = useState<string>();

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    await window.api.init();
    setServers(window.api.getServers());
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch(e.target.id) {
      case "server-input":
        setServerInput(e.target.value);
        break;
    }
  }

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    switch(target.id) {

      // 서버추가
      case "server-add-btn":
        if(serverInput) {
          window.api.addServer(serverInput);
          reload();
        }
        break;
    }
  }

  return (
    <div className="App">

      <div className="header">
        <div className="user-profile">
          (유저 이름)
        </div>
      </div>

      <div className="server-list">
        {
          servers?.map((value,i) => {
            return (
              <div key={i}>{ value }</div>
            )
          })
        }
      </div>

      <div className="server-manage-field">
        <button>직접연결</button>
        <button>직접연결</button>
        <button>서버추가</button>
        <button>수정</button>
        <button>삭제</button>
        <button>새로고침</button>
      </div>
    </div>
  );
}

export default App;
