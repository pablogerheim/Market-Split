import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home } from "./pages/Home";
import { Session } from "./pages/purchase/Session";
import { CreateProd } from "./pages/purchase/CreateProd";
import { UpdadeProd } from "./pages/purchase/UpdadeProd";
import { ControlUser } from "./pages/users/ControlUser";
import { CreateUser } from "./pages/users/CreateUser";
import { Login } from './pages/Login'
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { CreateGroup } from "./pages/group/CreateGroup";

function Router() {
 const auth = useContext(AuthContext);

  if (!auth.user) {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/session' element={<Session />} />
        <Route path='/create' element={<CreateProd />} />
        <Route path='/update' element={<UpdadeProd />} />
        <Route path='/user/control' element={<ControlUser />} />
        <Route path='/user/create' element={<CreateUser />} />
        <Route path="/user/*" element={<Navigate to="/user/control" />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
