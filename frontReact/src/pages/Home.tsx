import { useNavigate } from 'react-router-dom';
import '../css/helper.css';

function Home() {
    const navegat = useNavigate()
    function startSession() {
        navegat('/s')
    }
    return (
        <div className="shadowClass p-5 bg-white mt-1 w-[90%] border-8 border-solid= ">
         <button onClick={startSession} className='start "border-gray-300 border-solid border-b-4 bg-sky-300 px-10 py-4 rounded-md mt-5 text-3xl' >
            New Session
         </button>
        </div>
    );
}

export { Home };
