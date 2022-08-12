import { useState, useContext } from "react";
import { SocketContext } from "../../contexts";
import { AddRoomForm } from "./_addRoom";
import { StateSetters } from "../../types"; 
import { useNavigate } from 'react-router-dom';

// --[types]-- //
export type LobbyTypes = Partial<LobbyState & StateSetters<LobbyState>>;

type LobbyState = {
  roomName: string,
  roomDetails: { roomName: string, occupants: number },
  error: {
    emptyRoomDetails: boolean;
  }
}

// --[start]-- //
export function Lobby() {
  const [roomName, setRoomName] = useState<LobbyState['roomName']>('');
  const [rooms, setRooms] = useState<LobbyState['roomDetails'][]>([]);
  const [error, setError] = useState<LobbyState['error']>({ emptyRoomDetails: false })

  const { store: { mainSocket }, addSockets } = useContext(SocketContext);
  const navigate = useNavigate();

  const onAddRoom = e => {
    e.preventDefault();
    if (!roomName) {
      setError({ emptyRoomDetails: true });
      return;
    }
    // emit room details to main/lobby namespace so that all lobbies are updated in real time
    const roomDetails: LobbyState['roomDetails'] = { roomName: roomName, occupants: 1 }
    mainSocket.emit('add room', roomDetails);
    // navigate to room
    navigate(`/room/${roomName}`);
  }
  // initial rooms
  mainSocket.on('existing rooms', (roomDetails: LobbyState['roomDetails'][]) => {
    setRooms(roomDetails);
  })

  mainSocket.on('add room', (roomDetails: LobbyState['roomDetails']) => {
    setRooms([...rooms, { ...roomDetails }]);
  })

  const onJoinRoom = (roomName: string) => {
    // navigate user to chatroom page
    mainSocket.emit('join room', { roomName, username: 'Harold' });
    navigate(`/room/${roomName}`);
  }

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
          <li className="lobby-chatroom">
            <p>{`Room name: ${room.roomName} Occupants: ${room.occupants}`}</p>
            <button onClick={() => onJoinRoom(room.roomName)}>join</button>
          </li>
          
        ))}
      </ul>
    </div>
  )
}