import '../../css/helper.css';
import { useApi} from "../../data/api";
import { Iparticipant, Ipurchase } from "../../types/types";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { AuthContext } from '../../contexts/AuthContext';
import React from 'react';

function CreateProd() {
  const navegat = useNavigate()
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const auth = useContext(AuthContext)
  const [participants, setParticipants] = useState<Iparticipant[]>([])
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [quantity, setQuantity] = useState<string>();
  const [part, setPart] = useState<string[]>([]);
  const [user] = useState(auth.user)
  const [purchase] = useState(auth.purchase)
  const [erro, setErro] = useState<string>()

  useEffect(() => {
    if (user!== null) {
      const fetchUser = async () => setParticipants(await api.getUser(user.group_member));
      fetchUser()
    }
  }, [])

  console.log(auth)

async function createProd() {
  event?.preventDefault()
    if(purchase && auth.user && name && price && quantity){
    const resp = await api.createProduct({
      name: name,
      price: price,
      participants: part.toString(),
      quantity: quantity,
      purchase: purchase.purchaseId,
      group_member:auth.user.group_member
    }).catch(onrejected => 
      console.log("descrição do erro", onrejected));
    resp && navegat('/session');
  }else { setErro("User missing please login")}
  }

  const handlePart = (p: string) => {
    part.includes(p) ? setPart(part.filter(e => e !== p)) : setPart([...part, p])
  }

  const selecAll = () => {
    if (part.length === participants.length) { setPart([]) }
    else setPart(participants.map(p => p.name))
  }

  if (!participants) { return <p>Loading...</p> }

  return (
    <form className="p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className=" flex items-center justify-around gap-6 p-3">
        <button
          type='button'
          onClick={() => navegat('/session')}
          className='start px-6 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-6 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-green-400'
          onClick={createProd}
        >
          Add Product
        </button>
      </div>
      <div>
        <div className="flex justify-around">
          <label className="flex flex-col items-start p-1 m-1 ">
            Product Name
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white p-2 w-40 shadow-bot m-1"
            />
          </label>
          <button
            type='button'
            className='start px-2 my-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-blue-400'
            onClick={selecAll}
          >
            Select All
          </button>
        </div>
        <div className="flex justify-around">
          <label className="flex flex-col items-start p-1 m-1 w-[45%]">
            Product Price
            <input
            required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
            />
          </label>
          <label className="flex flex-col items-start p-1 m-1 w-[45%]">
            Number Prod
            <input
            required
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
            />
          </label>
        </div>
        <p className="text-red-500 mt-2">{erro && erro} </p>
      </div>
      <div className="flex justify-around "></div>
      <div className="flex justify-evenly"></div>
      <div className="p-2">{participants.map(p =>
        <div key={p.name + "part"} className="flex justify-between items-center shadow-bot">
          <p className='text-xl m-3 ml-5 '>{p.name}</p>
          <label className='mr-5'>
            <input
              className='m-2 h-5 w-5 text-fuchsia-400'
              type="checkbox"
              checked={part.includes(p.name)}
              onChange={() => handlePart(p.name)}
            />
            Will Partcipate
          </label>
        </div>)}</div>
    </form>
  );
}

export { CreateProd }
