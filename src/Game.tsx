import { socket } from './game/Server';
import {useState} from 'react';

function Game() {
    const [ img, setImg ] = useState<string>();
    const [ name, setName ] = useState<string>();

    socket.on('question', (args) => {
        setImg(args.image);        
        setName(args.name);        
    });

    return (
        <div className="game">
            <img src={img} alt="이미지를 불러오지 못했습니다." />
            <div>{ name }</div>
        </div>
    )
}

export default Game;