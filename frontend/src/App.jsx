import './css/App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' replace />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/*optional fallback*/}
      </Routes>
    </>
  )
}

export default App
