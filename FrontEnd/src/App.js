import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import commonComp from './Component/commonComp'
import AdminLogin from './pages/AdminLogin'

function App() {
  // const router =  createBrowserRouter([
  //   {
  //     path:"/",
  //     element:(
  //       <commonComp/>
  //     ),
  //     children:[
  //       {
  //         path:"adminHome",
  //         element:(),
  //       },
  //       {
  //         path:"userHome",
  //         element:(),
  //       }
  //     ]
  //   },
  //   {
  //     path:"/adminSignup",
  //     element:()
  //   },
  //   {
  //     path:"/adminLogin",
  //     element:(),
  //   },
  //   {
  //     path:"/userSignup",
  //     element:(),
  //   }
  //   {
  //     path:"/userLogin",
  //     element:(),
  //   }

  // ])
  return (
    <>
      <AdminLogin/>
    </>
    // <RouterProvider router={router} />
  )
}

export default App
