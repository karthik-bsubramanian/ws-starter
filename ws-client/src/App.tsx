import { useEffect, useState } from "react";
import './App.css';

function App() {
    const [socket, setSocket] = useState<null | WebSocket>(null);
    const [message, setMessage] = useState<string[]>([]);
    const [input,setInput] = useState("");
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('websocket server connected');
            setSocket(socket);
        }

        socket.onmessage = (message) => {
            console.log("message received", message.data);
            setMessage(m => [...m, message.data]);
        }
    }, []);

    if (!socket) return <div>
        connecting...
    </div>

    return <div>
        <input type="text" onChange={(e)=>setInput(e.target.value)} />
        <button onClick={()=>{
            socket.send(input);
        }}>Send</button>
        {message}
    </div>;
}

export default App;