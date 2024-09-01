import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import { Button } from 'antd';

const socket = io('localhost:3000');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('message', (data) => {
      setLastMessage(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('events', {data: 1});
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Connected: {'' + isConnected}</p>
        <p>Last message: {lastMessage || '-'}</p>
        <Button onClick={sendMessage}>Send message</Button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
