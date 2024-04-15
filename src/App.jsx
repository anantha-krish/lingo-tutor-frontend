import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container py-5 px-4 mx-auto  border border-primary">
      <h1>Hello, Bootstrap and Vite!</h1>
      <button className="btn btn-success">Primary button</button>
    </div>
    </>
  )
}

export default App
