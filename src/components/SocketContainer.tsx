import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { UserContext } from '../App';
import { notification } from 'antd';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user) {
      setSocket(null);
      return;
    }
    // Assuming you have the token stored in localStorage (or any other storage)
    const token = localStorage.getItem('remitano_token');

    // Initialize socket connection with JWT
    const newSocket = io(import.meta.env.VITE_BACKEND_ENDPOINT as string, {
      auth: {
        token: token,
      },
    });

    setSocket(newSocket);

    // Log when connected
    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    // Handle any incoming messages
    newSocket.on('new-video', (data) => {
      console.log('New video shared:', data);
      if (user && data.videoData.sharedBy !== user?._id)
        notification.info({
          message: 'New video is shared!',
          description: `${data.videoData.title} is shared! check it out!`,
        });
    });

    // Clean up when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
