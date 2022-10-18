import { useNavigate } from 'react-router-dom';
import '../css/helper.css';
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { useApi, loggedToken } from "../data/api";
import { purchaseu } from "../types/types";
import { NewPurchaseDialog } from "../componentes/newPurchaseDialog";

function Home() {
  const navegat = useNavigate();
  const auth = useContext(AuthContext)
  const token = loggedToken()
  const api = useApi(token.toString())
  const [purchases, setPurchases] = useState<purchaseu[]>()
  const [close, setClose] = useState(true)
  const logoutApp = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  };

  useEffect(() => {
    const getPurchases = async () => {
      const data = await api.getPurchase()
      setPurchases(data)
    }
    getPurchases()
  }, [])

  const handlepurchase = async (id: number) => {
    await auth.getPurchasebyid(id)
    navegat('/session')
  }

  return (<>
    {close || <NewPurchaseDialog setClose={setClose} />}
    <div className={`p-5 bg-white mt-1 w-[90%] h-[87vh] border-8 ${close || 'opacity-20'}`} >
      <button
        onClick={() => setClose(false)}
        className='start "border-gray-300 border-solid border-b-4 bg-sky-300 px-10 py-4 rounded-md mt-5 text-3xl'
      >
        New Purchase
      </button>
      <div className="flex flex-col items-center justify-between h-[70vh]">
        <button
          onClick={() => navegat('/user/control')}
          className='start max-w-[275px] w-[90%] "border-gray-300 border-solid border-b-4 bg-stone-300 px-10 py-4 rounded-md mt-5 text-3xl'
        >
          Add Users
        </button>
        <div className='role h-[66%] '>
          {purchases?.map(p => <button key={p.purchaseId} onClick={() => handlepurchase(p.purchaseId)} className='start max-w-[275px] "border-gray-300 border-solid border-b-4 bg-indigo-300 px-16 py-2 rounded-md mt-5 text-3xl'>
            <h2>{p.name}</h2>
            <p className='text-xl'>{p.timestamp}</p>
          </button>)}
        </div>
        <div className='z-10 h-12 bg-white'> brancokgeorgoweirgoenwqirgoieqngeonqigroqenirgoqe</div>
        <button
          type="submit"
          onClick={logoutApp}
          className='start max-w-[275px] w-[90%] "border-gray-300 border-solid border-b-4 bg-red-300 px-10 py-4 rounded-md mt-5 text-3xl z-10'
        >
          Logout
        </button>
      </div>
    </div>
  </>);
}
export { Home };
