import { LobbyTypes } from './'; 
import { FormEventHandler } from 'react';

// --[types]-- //
type AddRoomFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>,
} & LobbyTypes;


// --[start]-- //
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