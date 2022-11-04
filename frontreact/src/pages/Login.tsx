import { useContext, useState } from 'react';
import '../css/helper.css';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [err, setErr] = useState(false);
  
  async function submit() {
    event?.preventDefault();
    const userInfo = await auth.login(name, password);

    if (!userInfo) {
      setErr(true);
    } else {
      setErr(false);
    }
  }

  const erro = <p className="text-red-500"> Campo não preenchido </p>;
  return (
    <div className="screen flex justify-center w-full h-screen">
      <div className=" flex justify-center pt-2 bg-white w-[90%] h-[85%]">
        <form className="flex flex-col items-center show w-[90%] h-[85%] ">
          <h2 className="self-center mt-5 justify-center text-[2rem]">Login</h2>
          <label className="flex flex-col mt-10 items-start p-1 m-1 ">
            Nome
            <input
              className="bg-white p-2 w-50 shadow-bot m-1"
              placeholder="Nome"
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col mt-5 items-start p-1 m-1 ">
            Senha
            <input
              className="bg-white p-2 w-50 shadow-bot m-1"
              placeholder="Senha"
              required
              type="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          {err ? erro : ''}
          <button
            className='start px-8 py-2 mt-5 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-green-400'
            onClick={submit}
          >
            Submit
          </button>

          <button
            className='start px-8 py-2 mt-5 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-red-400'
            onClick={()=>{ console.log("lokalStorage",localStorage.getItem('authToken'),console.log("user:",auth.user))}}
          >
            Test
          </button>

          <p className=' mt-8 '> utilize "admin" - "admin" para testar o aplicativo como administrador </p>
          <p className=' mt-2 '> utiliza "user" - "user" para testar o aplicativo como usuario </p>
        </form>
      </div>
    </div>
  );
}

export { Login };
