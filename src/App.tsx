import { HashRouter, Routes, Route } from "react-router-dom";
import Connecting from "./Connecting";
import Game from "./Game";
import Home from "./Home";

function App() {
    
    return (
        <HashRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/connecting" element={<Connecting />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </div>
        </HashRouter>
    )
}

export default App;