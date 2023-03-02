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
        <input id="server-input" className="server-input" onChange={changeHandler} />
        <button id="server-add-btn" onClick={clickHandler}>서버추가</button>
      </div>
    </div>
  );
}

export default App;
