import './css/App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import LogOut from './pages/LogOut.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' replace />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/Logout' element={<LogOut />} />
        <Route path="*" element={<NotFound />} /> {/*optional fallback*/}
      </Routes>
    </>
  )
}

export default App
