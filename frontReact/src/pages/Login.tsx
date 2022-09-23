import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/helper.css';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);

  async function submit() {
    // const userInfo = await loginAdm({ name, password });
    // if (!userInfo.status === 200) { setErr(true); } else {
    //   setErr(false);
    //   login(userInfo.data.token);
    //   navigate('/home');
    // }
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
            className="bg-white p-2 w-0 shadow-bot m-1"
              placeholder="Nome"
              required
              type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />

          </label>
          {err ? erro : ''}
          <button
            className='start px-8 py-2 mt-5 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-green-400'
            onClick={submit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export { Login };