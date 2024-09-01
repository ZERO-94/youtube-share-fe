import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppHeader from './components/AppHeader';
import HomePage from './pages/HomePage';
import SharePage from './pages/SharePage';
import { getProfileAPI } from './services/authServices';
import { setAuthorizationHeader } from './services/axiosClient';
import { SocketProvider } from './components/SocketContainer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AppHeader />
        <HomePage />
      </>
    ),
  },
  {
    path: '/share',
    element: (
      <>
        <AppHeader />
        <SharePage />
      </>
    ),
  },
]);

const queryClient = new QueryClient();

export const UserContext = React.createContext({
  user: null,
  setUser: (value) => {},
});

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('remitano_token');
    if (token) {
      getProfileAPI(token)
        .then((res) => {
          const data = res.data;
          setAuthorizationHeader(token);
          setUser(data);
        })
        .catch(() => {
          setAuthorizationHeader();
          setUser(null);
        });
    } else {
      setAuthorizationHeader();
      setUser(null);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
