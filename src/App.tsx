import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/signup" />,
  },
  {
    path: "/Signin",
    element:<Login />,
  },
  {
    path: "/Signup",
    element: <Signup/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;