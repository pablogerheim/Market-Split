import '../../css/helper.css';
import { People } from '../../componentes/People';
import { Product } from '../../componentes/Product';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi ,loggedToken} from '../../data/api';

function Session() {
  const navegat = useNavigate();
  const token = loggedToken()
  const api = useApi(token.toString())
  const [page, setPage] = useState<boolean>(true);

  const toglePage = () => {
    setPage(!page);
  };

  function Finish(): void {
   api.clearTable()
    navegat('/home');
  }

  return (
    <div className="p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className="flex justify-around gap-4 px-3 h-14 pb-1">
        <input
          className="bg-white shadow-bot h-12 w-40 pb-1"
          placeholder="Name Session "
        />
        <button
          className='start px-2 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-red-400'
          onClick={Finish}
        >
          Finish
        </button>
      </div>
      <button
        onClick={() => navegat('/create')}
        className='start px-8 py-1 rounded-md mt-1 text-2xl "border-gray-300 border-solid border-b-4 bg-sky-300'
      >
        Add Product
      </button>
      <div className="flex justify-evenly">
        <button
          className={`start px-4 py-1 rounded-md mt-2 text-sm ${page ? 'border-gray-300 border-solid border-b-4 bg-emerald-300' : ''
            }`}
          onClick={toglePage}
          disabled={page}
        >
          By People
        </button>
        <button
          className={`start px-4 py-1 rounded-md mt-2 text-sm ${!page
              ? 'border-gray-300 border-solid border-b-4 bg-emerald-300'
              : ''
            }`}
          onClick={toglePage}
          disabled={!page}
        >
          By Product
        </button>
      </div>
      <div className="p-2 mt-4">{page ? <People /> : <Product />}</div>
    </div>
  );
}

export { Session };
