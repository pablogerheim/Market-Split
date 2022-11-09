import '../../css/helper.css';
import { useApi} from "../../data/api";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import React from 'react';

function CreateGroup() {
  const api = useApi();
  const navegat = useNavigate();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [erro, setErro] = useState<string>()

  async function createNewUser() {

    const resp = await api.register({
      name: name,
      password: password
    }).catch(onrejected => setErro(onrejected.response.data.msg))

   resp?.status === 200 && navegat('/login')
  }

  return (
    <div className="p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className=" flex items-center justify-around gap-6 p-3">
        <button
          onClick={() => navegat('/user/control')}
          className='start px-6 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-6 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-green-400'
          onClick={createNewUser}
        >
          Create group_member
        </button>
      </div>
      <h2>
      MASTER ADM NEW group_member
      </h2>
      <div>
        <label className="flex flex-col items-start p-1 m-1 ">
          Name
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-white p-2 shadow-bot m-2"
          />
        </label>

        <label className="flex flex-col items-start p-1 m-1 ">
          Password
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
          />
        </label>
      </div>
      <p className='text-red-500'>{erro && erro}</p>
    </div>
  );
}

export { CreateGroup };
