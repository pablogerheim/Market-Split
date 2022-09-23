import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home } from "./pages/Home";
import { Session } from "./pages/Session";
import { CreateProd } from "./pages/CreateProd";
import { UpdadeProd } from "./pages/UpdadeProd";
import { Login } from './pages/Login'
import { useState } from 'react';

function Router() {
  const [user, setUser] = useState(false)

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Login />} />
        </Routes>
      </BrowserRouter>)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/session' element={<Session />} />
        <Route path='/create' element={<CreateProd />} />
        <Route path='/update' element={<UpdadeProd />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
