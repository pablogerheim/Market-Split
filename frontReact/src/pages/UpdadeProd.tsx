import '../css/helper.css';
import { participant,product, getUser, updateProduct, getbyid } from '../data/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/Bi';

interface id {
  id:number
}

function UpdadeProd({ id }: id) {
  const navegat = useNavigate();
  const [participants, setParticipants] = useState<participant[]>();
  const [product, setProduct] = useState<product>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => setParticipants(await getUser());
  const fetchProd = async () => setProduct(await getbyid(id));

  function updateProd(): void {
    updateProduct;
    navegat('/s');
  }

  return (
    <div className="p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className=" flex items-center justify-center gap-6 p-3">
        <button
          onClick={() => navegat('/')}
          className='start px-4 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-2 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-blue-400'
          onClick={updateProd}
        >
          Update Product
        </button>
      </div>
      <div>
        <label className="flex flex-col items-start p-1 m-1 ">
          Product Name
          <input
            type="text"
            name="nameProd"
            className="bg-white p-2 shadow-bot m-2"
          />
        </label>
        <div className="flex justify-around">
          <label className="flex flex-col items-start p-1 m-1 w-[45%]">
            Product Value
            <input
              type="number"
              name="valueProd"
              className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
            />
          </label>
          <label className="flex flex-col items-start p-1 m-1 w-[45%]">
            Number Prod
            <input
              type="number"
              name="NumberProd"
              className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-evenly"></div>
      <div className="p-2">
        {participants
          && participants.map(p => (
            <div
              key={p.id + 'p'}
              className="flex justify-between items-center shadow-bot"
            >
              <p className="text-xl m-3 ml-5 ">{p.name}</p>
              <label className="mr-5">
                <input
                  className="m-2 h-5 w-5 text-fuchsia-400"
                  type="checkbox"
                />
                Will Partcipate
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}

export { UpdadeProd };
