import { useNavigate } from 'react-router-dom';
import '../css/helper.css';
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { useApi } from "../data/api";
import { Ipurchase } from "../types/types";
import { NewPurchaseDialog } from "../componentes/newPurchaseDialog";
import React from "react";

function Home() {
  const navegat = useNavigate();
  const auth = useContext(AuthContext)
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const [purchases, setPurchases] = useState<Ipurchase[]>()
  const [close, setClose] = useState(true)
  const [erro, setErro] = useState<string>()
  const [user] = useState(auth.user)
  const [opacity, setOpacity] = useState(false)

  const logoutApp = async () => {
    auth.signout();
    setOpacity(true)
  };

  useEffect(() => {
    !user?.group_member && setErro(" User missing please reload")
    if (user) {
      const getPurchases = async () => {
        const data = await api.getPurchase(user?.group_member).catch(onrejected =>
          console.log("descrição do erro", onrejected))
        setPurchases(data?.data)
      }
      getPurchases()
    } else setErro("session expired")
  }, [])

  const handlepurchase = async (id: number, name: string) => {
    auth.getPurchasebyid({ purchaseId: id, name })
    navegat('/session')
  }

  return (<>
    {close || <NewPurchaseDialog setClose={setClose} />}
    <div className={`p-5 bg-white mt-1 w-[90%] h-[87vh] border-8 ${close || 'opacity-20'} ${opacity && 'opacity-40'}`} >
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
        <p className="text-red-500 mt-2">{erro && erro} </p>
        <div className='overflow-board h-[66%] mt-4 min-w-[300px]'>
          {!purchases && <p className='mt-5'> Loading...</p>}
          {purchases?.map(p => <button key={p.purchaseId} onClick={() => handlepurchase(p.purchaseId, p.name)}
            className='start flex flex-col w-[275px] max-w-[275px] mx-4 "border-gray-300 border-solid border-b-4 bg-indigo-300 px-16 py-2 rounded-md mt-5 text-3xl'>
            <h2>{p.name}</h2>
            <p className='text-xl'>{p.timestamp}</p>
          </button>)
          }
          {purchases?.length === 0 && <p className='mt-5'> Create your first purchase </p>}
        </div>
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
