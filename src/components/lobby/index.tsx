import { useState, useContext, Dispatch, SetStateAction } from "react";
import { SocketContext } from "../../contexts";
import { AddRoomForm } from "./_addRoom";

export type LobbyStateSetter<T> = Dispatch<SetStateAction<T>>;
export type LobbyState = {
  roomName: string,
  roomDetails: { roomName: string, creator: string, createdAt: string, occupants: number },
  error: {
    [errorType: string]: boolean
  }
}

export function Lobby() {
  const [roomName, setRoomName] = useState<LobbyState['roomName']>('');
  const [rooms, setRooms] = useState<LobbyState['roomDetails'][]>([]);
  const [error, setError] = useState<LobbyState['error']>({ emptyRoomDetails: false })

  const { store: { mainSocket }, addSockets } = useContext(SocketContext);

  const onAddRoom = e => {
    e.preventDefault();
    if (!roomName) {
      setError({ emptyRoomDetails: true });
      return;
    }
    // emit room details to main/lobby namespace so that all lobbies are updated in real time
    const roomDetails = { roomName: roomName, creator: 'User1', createdAt: new Date().toLocaleString(), occupants: 0 }
    mainSocket.emit('add room', roomDetails);
    setRooms([...rooms, roomDetails]);
    setRoomName('');
    setError({ emptyRoomDetails: false });
  }

  mainSocket.on('add room', (roomDetails: LobbyState['roomDetails']) => {
    setRooms([...rooms, { ...roomDetails }]);
  })

  return (
    <div id="lobby-page">
      <AddRoomForm
        error={error}
        roomName={roomName}
        setRoomName={setRoomName}
        onSubmit={onAddRoom}
      />
      <ul id="lobby-chatrooms">
        {rooms.map(room => (
          <li className="lobby-chatroom"><span>{room.roomName}</span><span>Created at: {room.createdAt}</span><span>Occupants: {room.occupants}</span></li>
        ))}
      </ul>
    </div>
  )
}