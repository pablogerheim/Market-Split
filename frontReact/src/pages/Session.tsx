import '../css/helper.css';
import { People } from "../componentes/People";
import { Product } from "../componentes/Product";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Session() {
   const navegat = useNavigate()
const [page, setPage] = useState<boolean>(true)

    function toglePage() {
        setPage(!page)
    }
    function EndSession() {
        navegat('/')
    }
    function addProd() {
        navegat('/c')
    }

    return (
        <div className="shadowScreen p-5 bg-white mt-1 w-[90%] border-8 ">
            <div className='flex gap-4 p-3'>

            <label>
            Session
            <input
            className='bg-white p-2 shadow-bot '
            placeholder='Name Session '
            />
            </label>
            </div>
         <button onClick={addProd} className='start px-8 py-2 rounded-md mt-3 text-3xl "border-gray-300 border-solid border-b-4 bg-sky-300' >
           Add Product
         </button>
         <div className='flex justify-evenly'>
         <button className={`start px-4 py-2 rounded-md mt-2 text-sm ${ page? "border-gray-300 border-solid border-b-4 bg-emerald-300":""}`} onClick={toglePage} disabled={page}>
           By People
         </button>
         <button className={`start px-4 py-2 rounded-md mt-2 text-sm ${ !page? "border-gray-300 border-solid border-b-4 bg-emerald-300":""}`} onClick={toglePage} disabled={!page}>
           By Product
         </button>
            </div>
         <div className='show p-2 mt-4 h-[65%]'>
           {page? <People/> : <Product/>}
         </div>
         <button className='start px-8 py-2 rounded-md mt-3 text-3xl "border-gray-300 border-solid border-b-4 bg-red-400' onClick={EndSession} >
          End Session
         </button>
        </div>
    );
}

export { Session };