import '../css/helper.css';
import { participant, getUser, createProduct } from "../data/api";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/Bi';

function UpdateDialog({
    setClose
}:any) {
    const navegat = useNavigate()
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [access, setAccess] = useState<string>('');
  
    useEffect(() => {
  
    }, [])
  
    function createUser(): void {
      // createUser({
      //   name: name,
      //   password: password,
      //   access: access,
      // })
      navegat('/user');
    }

    return (
      <div className="dialogStyles">
        <div className=" flex items-center justify-around gap-6 p-3">
        <button
          onClick={()=>setClose(true)}
          className='start px-6 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-6 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4  bg-blue-400'
          onClick={createUser}
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

          <select
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]">
            <option>User</option>
            <option>Adm</option>
          </select>
        </label>

      </div>
      </div>
    );
}
export { UpdateDialog };