import logo from "./logo.svg";
import { io } from "socket.io-client";
import "./App.css";
//import socketIOClient, { Socket } from "socket.io-client";
import Bubble from "./Bubble.js";
import React from "react";

function App() {
  const socket = io("http://192.168.100.182:5000");
  const [username, setUsername] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    { username: "Khalid", message: "Hello Q" },
  ]);

  React.useEffect(() => {
    socket.on("chat", (data) => {
      setMessages((current) => [...current, data]);
    });
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    socket.emit("chat", {
      username: username,
      message: message,
    });
  };
  return (
    <div className="App">
      <header className="App-header2">
        <div id="besquare-chat">
          <div id="chat-window">
            {messages.map((element, index) => {
              return (
                <Bubble
                  key={index}
                  username={element.username}
                  message={element.message}
                />
              );
            })}
          </div>

          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button id="send" onClick={sendMessage}>
            Send
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
