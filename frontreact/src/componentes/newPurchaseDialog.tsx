import '../css/helper.css';
import { useApi } from '../data/api';
import { useContext, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import React from 'react';
import { AuthContext } from '../contexts/AuthContext';

function NewPurchaseDialog({
  setClose
}: any) {
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const auth = useContext(AuthContext)
  const [name, setName] = useState<string>('');
  const [erro, setErro] = useState<string>()
  const [user] = useState(auth.user)

  const create = async () => {
    if (user) {
      const resp = await api.createPurchase({
        name: name,
        group_member: user.group_member
      }).catch(onrejected => console.log(onrejected.response.data.msg));
      name === '' && setErro("The Name is required!")
      if (resp?.status === 200) {
        setClose(true)
      }
    }
  }

  return (
    <div className="dialogStyles">
      <div className=" flex items-center justify-around gap-6 p-3">
        <button
          onClick={() => setClose(true)}
          className='start px-6 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-6 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4  bg-blue-400'
          onClick={create}
        >
          Create Purchase
        </button>
      </div>
      <div>
        <label className="flex flex-col p-1 m-1 items-center mt-10">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white p-2 shadow-bot m-2"
          />
        </label>
      </div>
      <p className="text-red-500">{erro && erro} </p>
    </div>
  );
}
export { NewPurchaseDialog };