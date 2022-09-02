import { products } from "../data/mock";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Product() {
    const [prodState, setProdState] = useState(products)   
    const navegat = useNavigate()

    function updadeProd() {
        navegat('/u')
    }

    function deleteProd(id:number) {
        setProdState(prodState.filter(p => p.id !== id))        
    }

    function print() {
        return prodState.map(p =>
            <div key={p.id + "p"} className="flex justify-between items-center shadow-bot">
                <p className='text-xl m-3 '>{p.name}</p>
                <p className='text-xl m-3 border-l-2 border-solid border-gray-400 pl-2'>{p.participants.length}</p>
                <button onClick={updadeProd} className='bg-yellow-300 p-1 m-1 rounded shadow-hover'> <AiOutlineEdit className='h-6 w-6' /> </button>
                <p className='text-xl m-3 '>R$: {p.value.toFixed(2).replace(".", ",")}</p>
                <button onClick={()=>deleteProd(p.id)} className='bg-red-300 p-1 m-1 rounded shadow-hover'> <AiOutlineClose className='h-6 w-6' /> </button>
            </div>)
    }

    return (
        <div className="">
            <div className='grid grid-cols-2 gap-1 mt-1 '>
                <p className='text-xl m-2 p-2 px-5 show-sm'> Products: {prodState.length}</p>
                <p className='text-xl m-2 p-2 show-sm'> Total: R$ {prodState.reduce((pv, cv) => pv + cv.value, 0).toFixed(2).replace('.', ',')}</p>
            </div>
            {print()}
        </div>
    );
}

export { Product };
