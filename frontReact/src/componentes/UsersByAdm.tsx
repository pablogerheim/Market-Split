import { useEffect, useState } from 'react';
import { participant, getUser, deleteUser } from '../data/api';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { v4 } from 'uuid';
import { UpdateDialog } from "../componentes/updateDialog";

function UsersByAdm() {
  const [participants, setParticipants] = useState<participant[]>([])
  const [close, setClose] = useState(true)

  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = async () => setParticipants(await getUser());
  const updateUser = () => {    setClose(false)  }
  const deleteUserFunc = (id:number) => {deleteUser(id)}

  if (!participants) {
    return <p>Loading...</p>
  }
  return (
    <div className=" ">
      <div className="grid grid-cols-2 gap-1 mt-1 ">
        <p className="text-xl m-2 p-2 show-sm">
          Users: 2
        </p>
        <p className="text-xl m-2 p-2 show-sm">
          Adms: 1
        </p>
      </div>
      {close || <UpdateDialog setClose = {setClose} /> }
      <div className="p-2">
        {participants.map(p =>
          <div
            key={v4()}
            className="flex justify-between items-center shadow-bot"
          >
            <p className="text-xl m-3 ml-5 ">{p.name}</p>
            <p className="text-xl m-3 ml-5 ">{p.access}</p>
            <button
              onClick={updateUser}
              className="bg-yellow-300 p-1 m-1 rounded shadow-hover"
            >
              <AiOutlineEdit className="h-6 w-6" />
            </button>
            <button
               onClick={()=>deleteUserFunc(p.userId)}
              className="bg-red-300 p-1 m-1 rounded shadow-hover"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { UsersByAdm };
