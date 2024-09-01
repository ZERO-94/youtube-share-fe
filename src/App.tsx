import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppHeader from './components/AppHeader';
import HomePage from './pages/HomePage';
import SharePage from './pages/SharePage';

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

  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem('remitano_token');
    if (token) {
      axios
        .get('http://localhost:3000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setUser(data);
        })
        .catch(() => {
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
