import '../css/helper.css';
import { useApi} from '../data/api';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Idialog, IuserAPI} from "../types/types";
import { AuthContext } from '../contexts/AuthContext';
import React from 'react';
import { setDefaultResultOrder } from 'dns/promises';

function UpdateDialog({
  userId,
  setClose
}:Idialog) {
    const navegat = useNavigate()
    const token = localStorage.getItem('authToken')
    const api = useApi(token?.toString())
    const auth = useContext(AuthContext)
    const [user] = useState<IuserAPI|null>(auth.user);
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [access, setAccess] = useState<string>('');
    const [erro, setErro] = useState<string>()

    useEffect(() => {
      const startUpdate = async () => {
        let prod = await api.getUserById(userId)
        setName(prod?.name)
        setAccess(prod?.access)
      } 
      startUpdate()
    }, [])
  
    const update = async () => {
      if (user) {
        const resp =  await api.updateUser({
        userId: userId,
        password: password,
        name: name,
        access: access,
        group_member: user.group_member
      }).catch(onabort => console.log(onabort.response))
      resp ? navegat('/user/s') : setErro("Loading... something seems wrong")}}

    return (
      <div className="dialogStyles min-h-[420px] ">
        <div className=" flex items-center justify-around gap-6 p-3">
        <button
          onClick={()=>setClose(true)}
          className='start px-6 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-6 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4  bg-blue-400'
          onClick={update}
        >
        Update User
        </button>
      </div>
      <div>
        <label className="flex flex-col items-start p-1 m-1 ">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white p-2 shadow-bot m-2"
          />
        </label>

        <label className="flex flex-col items-start p-1 m-1 ">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
          />
        </label>

        <label className="flex flex-col items-start p-1 m-1 ">
          Access
          {user?.access === "User"?<select
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]">
            <option>User</option>
          </select>:           <select
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]">
            <option>User</option>
            <option>Adm</option>
          </select> }
        </label>
        <p className="text-red-500 mt-2">{erro && erro} </p>
      </div>
      </div>
    );
}
export { UpdateDialog };