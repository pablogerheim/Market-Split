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

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/s' element={<Session />} />
        <Route path='/c' element={<CreateProd />} />
        <Route path='/u' element={<UpdadeProd />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
