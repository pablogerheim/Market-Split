import { useEffect, useState } from 'react';
import { participant, getUser } from '../data/api';
import { v4 } from 'uuid';

function UsersByUsers() {
  const [participants, setParticipants] = useState<participant[]>([])

  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = async () => setParticipants(await getUser());
  
  if (!participants ) {
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
      <div className="p-2">
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
