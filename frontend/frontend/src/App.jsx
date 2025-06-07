import { useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import Students from './components/Students'
import Home from './components/Home'
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <Home/>
        },
        {
          path: "students",
          element: <Students/>
        }
      ]
    }
  ])
  return (
    <>
     <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
