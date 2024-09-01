import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { UserContext } from '../App';
import { notification } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
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
      queryClient.refetchQueries({
        queryKey: ['videos', user?.email],
      });
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
