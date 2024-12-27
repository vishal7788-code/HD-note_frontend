
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'



const appRouter = createBrowserRouter([
  {
    path: "/Signin",
    element: <Login />
  },
  {
    path: "/Signup",
    element: <Signup />
  },

])
function App() {


  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
