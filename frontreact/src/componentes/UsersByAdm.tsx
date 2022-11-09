import { useContext, useEffect, useState } from 'react';
import { useApi } from '../data/api';
import { Iparticipant } from "../types/types";
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { v4 } from 'uuid';
import { UpdateDialog } from "./updateDialog";
import React from 'react';
import { AuthContext } from '../contexts/AuthContext';

function UsersByAdm() {
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const auth = useContext(AuthContext)
  const [participants, setParticipants] = useState<Iparticipant[]>([])
  const [close, setClose] = useState(true)
  const [id, setId] = useState<number>(0)
  const [user] = useState(auth.user)
  const [erro, setErro] = useState<string>()

  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = async () => {
    if (user) {
      const resp = await api.getUser(user.group_member)
        .catch(onabort => console.log(onabort.response))

      resp ? setParticipants(resp): setErro("Missing group_member please reload")
    } 

  };
  const updateUser = (idu: number) => { setId(idu); setClose(false) }
  const deleteUserFunc = async (id: number) => { await api.deleteUser(id), await fetchUser() }

  console.log("participants", participants)

  if (!participants) { return <p>Loading...</p> }
  return (<>
    {close || <UpdateDialog setClose={setClose} userId={id} />}
    <div className={` ${close || 'opacity-20'}`}>
      <div className="grid grid-cols-2 gap-1 mt-1 ">
        <p className="text-xl m-2 p-2 show-sm">
          Users: {participants.map(p => p.access === "User" ? 1 : 0.00001).reduce((p, c) => p + c, 0).toFixed(0)}
        </p>
        <p className="text-xl m-2 p-2 show-sm">
          Adms: {participants.map(p => p.access === "Adm" ? 1 : 0.00001).reduce((p, c) => p + c, 0).toFixed(0)}
        </p>
      </div>
      <p className="text-red-500 mt-2">{erro && erro} </p>
      <div className="p-2">
        {participants.map(p =>
          <div
            key={v4()}
            className="flex justify-between items-center shadow-bot"
          >
            <p className="text-xl m-3 ml-5 ">{p.name}</p>
            <p className="text-xl m-3 ml-5 ">{p.access}</p>
            <button
              onClick={() => updateUser(p.userId)}
              className="bg-yellow-300 p-1 m-1 rounded shadow-hover"
            >
              <AiOutlineEdit className="h-6 w-6" />
            </button>
            <button
              onClick={() => deleteUserFunc(p.userId)}
              className="bg-red-300 p-1 m-1 rounded shadow-hover"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  </>);
}

export { UsersByAdm };
