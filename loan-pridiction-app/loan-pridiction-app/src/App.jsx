import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Form />
    <Footer/>
       </>
  )
}

export default App
