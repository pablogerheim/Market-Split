import { useNavigate } from 'react-router-dom';
import '../css/helper.css';
import { logout } from "../data/api";

function Home() {
    const navegat = useNavigate()

    const logoutApp = () => {logout(); document.location.reload()}

    return (
      <div className="shadowClass flex-col p-5 bg-white mt-1 w-[90%] border-8 border-solid= ">
        <button
          onClick={() => navegat('/session')}
          className='start "border-gray-300 border-solid border-b-4 bg-sky-300 px-10 py-4 rounded-md mt-5 text-3xl'
        >
          New Purchase
        </button>
        <button
          onClick={() => navegat('/session')}
          className='start "border-gray-300 border-solid border-b-4 bg-sky-300 px-10 py-4 rounded-md mt-5 text-3xl'
        >
          Add Users
        </button>
        <button
        type='submit'
          onClick={logoutApp}
          className='start "border-gray-300 border-solid border-b-4 bg-red-300 px-10 py-4 rounded-md mt-5 text-3xl'
        >
          Logout
        </button>
      </div>
    );
}
export { Home };
    