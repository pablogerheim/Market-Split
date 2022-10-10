import '../../css/helper.css';
import { useState, useEffect } from 'react';
import { UsersByAdm } from '../../componentes/UsersByAdm';
import { UsersByUsers } from '../../componentes/UsersByUsers';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/Bi';

function ControlUser() {
  const navegat = useNavigate();
  const [page, setPage] = useState<boolean>(true);

  useEffect(() => {

  }, []);


  return (
    <div className="p-5 bg-white mt-1 w-[90%] border-8 ">
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
      </div>

      <div className="p-2 mt-4">{page ? <UsersByAdm /> : <UsersByUsers />}</div>
    </div>
  );
}

export { ControlUser };
