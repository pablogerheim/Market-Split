import '../../css/helper.css';
import { useState } from 'react';
import { UsersByAdm } from '../../componentes/UsersByAdm';
import { UsersByUsers } from '../../componentes/UsersByUsers';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/Bi';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { User } from '../../types/types';
import { UpdateDialog } from "../../componentes/updateDialog";

function ControlUser() {
  const navegat = useNavigate();
  const auth = useContext(AuthContext)
  const [user, ] = useState<User|null>(auth.user);
  const [close, setClose] = useState(true)

if(!user){return <p> "Loading..."</p>}

console.log(user.user_id)

  return (
    <>
    {close || <UpdateDialog setClose={setClose} userId={user.user_id} />}
    <div className={`p-5 bg-white mt-1 w-[90%] border-8 ${close || 'opacity-20'}`} >
      <div className=" flex items-center justify-center gap-6 p-3">
        <button
          onClick={() => navegat('/home')}
          className='start px-4 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          onClick={() => navegat('/user/create')}
          className='start px-8 py-1 rounded-md mt-1 text-2xl "border-gray-300 border-solid border-b-4 bg-sky-300'
        >
          Add User
        </button>
        {user.access === "User"? <button
          onClick={() => setClose(false)}
          className='start px-4 py-1 rounded-md mt-1 text-2xl "border-gray-300 border-solid border-b-4 bg-blue-300'
        >
          Update 
        </button>:''}
      </div>
      <div className="p-2 mt-4">{user.access === "Adm"? <UsersByAdm /> : <UsersByUsers />}</div>
    </div>
    </> );
}

export { ControlUser };
