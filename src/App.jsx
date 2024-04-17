import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Dashboard';
import Languages from './Languages';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LanguageDetail from './LanguageDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path:"/languages",
    element:<Languages/>
  },
  {
    path:"/languages/:id",
    element:<LanguageDetail/>
  }
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={router} />
     
    </>
  )
}

export default App
