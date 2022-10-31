import '../css/helper.css';
import { useApi} from '../data/api';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/Bi';

function NewPurchaseDialog({
  setClose
}: any) {
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const [name, setName] = useState<string>('');

  const create = async () => {
    await api.createPurchase({ name:name })
    setClose(true)
    window.location.href = window.location.href;
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
    </div>
  );
}
export { NewPurchaseDialog };