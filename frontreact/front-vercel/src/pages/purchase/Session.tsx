import '../../css/helper.css';
import { People } from '../../componentes/People';
import { Product } from '../../componentes/Product';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../data/api';
import { AuthContext } from "../../contexts/AuthContext";
import { BiArrowBack } from 'react-icons/Bi';

function Session() {
  const navegat = useNavigate();
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const auth = useContext(AuthContext)
  const [page, setPage] = useState<boolean>(true);
  const [name, setName] = useState<string|undefined>(auth.purchase?.name)
 
  const toglePage = () => {
    setPage(!page);
  };

const handleDelete = async() => {
  if (auth.purchase !== null && auth.purchase.purchaseId !== undefined) {
     await api.clearTable(auth.purchase.purchaseId)
     await api.deletePurchase(auth.purchase.purchaseId)
    }
    navegat('/home');
  }

  const handleSave = async() => {
   name && await api.updatePurchase({name:name, purchaseId:auth.purchase?.purchaseId})
    navegat('/home');
  }

  return (
    <div className="p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className="flex justify-around gap-4 px-3 h-14 pb-1">
      <button
          className='start px-6 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
          onClick={handleSave}
        >
            <BiArrowBack />
        </button>
        <input
          className="bg-white shadow-bot h-12 w-40 pb-1 text-2xl"
          placeholder="Name Session"
          value={name}
          onChange={(e)=> setName(e.target.value) }
        />
        <button
          className='start px-2 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-red-400'
          onClick={handleDelete}
        >
          Delete
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
