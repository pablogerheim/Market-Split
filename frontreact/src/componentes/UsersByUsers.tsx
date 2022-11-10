import { useContext, useEffect, useState } from 'react';
import { useApi} from '../data/api';
import { Iparticipant } from "../types/types";
import { v4 } from 'uuid';
import React from 'react';
import { AuthContext } from '../contexts/AuthContext';


function UsersByUsers() {
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const auth = useContext(AuthContext)
  const [participants, setParticipants] = useState<Iparticipant[]>([])
  const [user] = useState(auth.user)
  const [erro, setErro] = useState<string>()

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const resp = await api.getUser(user.group_member)
          .catch(onabort => console.log(onabort.response))
  
        resp ? setParticipants(resp): setErro("Missing group_member please reload")
      } 
    };
    fetchUser();
  }, [])
  
  if (!participants ) {
    return <p>Loading...</p>
  }
  return (
    <div >
      <div className="grid grid-cols-2 gap-1 mt-1 ">
        <p className="text-xl m-2 p-2 show-sm">
          Users: 2
        </p>
        <p className="text-xl m-2 p-2 show-sm">
          Adms: 1
        </p>
      </div>
      <p className="text-red-500 mt-2">{erro && erro} </p>
      <div className="p-2 ">
        {participants.map(p =>
            <div
              key={v4()}
              className="flex justify-between items-center shadow-bot"
            >
              <p className="text-xl m-3 ml-5 ">{p.name}</p>
              <p className="text-xl m-3 ml-5 ">{p.access}</p>
            </div>
          )}
      </div>
    </div>
  );
}

export { UsersByUsers };
