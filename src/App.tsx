import { useState, useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';


const Loader = () => {
  return <div className="loader text-xl text-center font-semibold text-gray-700">Loading...</div>;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signup" />
  },
  {
    path: "/Signin",
    element: <Login />
  },
  {
    path: "/Signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <RouterProvider router={appRouter} />
      )}
    </>
  );
}

export default App;