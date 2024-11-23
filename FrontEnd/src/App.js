import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import AdminLogin from './pages/AdminLogin'
import AdminSign from './pages/AdminSign'
import Available from './pages/Available'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App() {
  const router =  createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/admin",
      element:<Admin/>
    },
    {
      path:"/available/*",
      element:<Available/>
    },
    {
      path:"/adminsignup",
      element:<AdminSign/>
    },
    {
      path:"/adminLogin",
      element:<AdminLogin/>,
    }

  ])
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
