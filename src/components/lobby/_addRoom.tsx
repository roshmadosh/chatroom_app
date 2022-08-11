
import { LobbyState, LobbyStateSetter } from "."

type AddRoomFormProps = {
  error: LobbyState['error'],
  onSubmit: React.FormEventHandler<HTMLFormElement>,
  roomName: LobbyState['roomName']
  setRoomName: LobbyStateSetter<LobbyState['roomName']>
}

export function AddRoomForm({ onSubmit, roomName, setRoomName, error }: AddRoomFormProps) {
  
  return (
    <form id="add-room-form" onSubmit={onSubmit}>
      <p>Add a chatroom.</p>
      <label htmlFor="chatroom-name">Name:</label>
      <input 
        type="text" 
        id="chatroom-name" 
        value={roomName} 
        onChange={e => setRoomName(e.target.value)}/>
      {error.emptyRoomDetails && <p>Room name cannot be empty.</p>}
      <button>Add</button>
  </form>
  )
}