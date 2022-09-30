import { useNavigate } from 'react-router-dom';
import '../css/helper.css';
import { logout } from "../data/api";

function Home() {
    const navegat = useNavigate()

    const logoutApp = async() => {
      console.log("token == ",localStorage.getItem('userToken'))
 await logout();
  //      document.location.reload()
      }

    return (
      <div className=" p-5 bg-white mt-1 w-[90%] h-[87vh] border-8 border-solid= ">
        <button
          onClick={() => navegat('/session')}
          className='start "border-gray-300 border-solid border-b-4 bg-sky-300 px-10 py-4 rounded-md mt-5 text-3xl'
        >
          New Purchase
        </button>
        <div className='flex flex-col items-center justify-between h-[70vh]'> 
        <button
          onClick={() => navegat('/user/control')}
          className='start max-w-[275px] w-[90%] "border-gray-300 border-solid border-b-4 bg-stone-300 px-10 py-4 rounded-md mt-5 text-3xl'
        >
          Add Users
        </button>
        <button
        type='submit'
          onClick={logoutApp}
          className='start max-w-[275px] w-[90%] "border-gray-300 border-solid border-b-4 bg-red-300 px-10 py-4 rounded-md mt-5 text-3xl'
        >
          Logout
        </button>
        </div>
      </div>
    );
}
export { Home };
    