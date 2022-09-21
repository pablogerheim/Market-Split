import { product, deleteProduct, getProduct } from '../data/api';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EventBus from '../helper/EventBus';


function Product() {
  const [prods, setProds] = useState<product[]>();
  const navegat = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => setProds(await getProduct());

  function updadeProd(id: number) {
    setTimeout(() => {
      EventBus.dispatch('setId', id);
    }, 0);
    navegat('/u');
  }

  const deleteProd = async (id: number) => { await deleteProduct(id); fetchProduct(); }

  if (!prods) {
    return <p>Loading...</p>
  }
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-1 mt-1 ">
        <p className="text-xl m-2 p-2 px-5 show-sm">
          Products: {prods.length}
        </p>
        <p className="text-xl m-2 p-2 show-sm">
          Total: R$
          {prods
            .reduce((pv, cv) => pv + parseInt(cv.price) * parseInt(cv.quantity), 0)
            .toFixed(2)
            .replace('.', ',')}
        </p>
      </div>
      {prods.map(p => (
        <div key={p.productId + 'p'}>
          <p className="text-xl m-3 ">{p.name}</p>
          <div className="flex justify-between items-center shadow-bot">
            <p className="text-xl m-3 border-l-2 border-solid border-gray-400 pl-2">
              By: {p.participants.length}
            </p>
            <p className="text-xl m-3 ">
              R$: {(parseInt(p.price) * parseInt(p.quantity)).toFixed(2).replace('.', ',')}
            </p>
            <button
              onClick={() => updadeProd(p.productId)}
              className="bg-yellow-300 p-1 m-1 rounded shadow-hover"
            >
              <AiOutlineEdit className="h-6 w-6" />
            </button>
            <button
              onClick={() => deleteProd(p.productId)}
              className="bg-red-300 p-1 m-1 rounded shadow-hover"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { Product };
