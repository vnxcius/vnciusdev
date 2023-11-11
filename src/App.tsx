import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/404' element={<h1>Not Found</h1>} />
        <Route path='*' element={<Navigate to='/404' />} />
         
      </Routes>
    </>
  )
}

export default App