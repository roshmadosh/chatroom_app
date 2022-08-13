import { useState, useContext, useEffect, useRef, MutableRefObject } from 'react';
import { SocketContext } from '../../contexts';
import { useParams, useNavigate } from 'react-router-dom'

type DisplayedMessageType = {
  createdAt: string,
  value: string,
}
export function Room() {
  const [message, setMessage] = useState(''); // form input content must be controlled to clear after submitting (w/o using query selectors)
  const [messages, setMessages] = useState<DisplayedMessageType[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  // React state is weird and doesn't conform w typical JS closure behavior, so a Ref needed for messages to persist to chatListener callback
  // NOTE TO SELF: try to keep state out of socket listener callbacks to prevent "duplicating" state data
  const messagesRef: MutableRefObject<DisplayedMessageType[]> = useRef(messages);
  
  const { store: { mainSocket } } = useContext(SocketContext);
  const { roomName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const logMessage = message => {
      console.log(message);
    }
    const chatListener = (msg: string) => {
      const updated: DisplayedMessageType[] = [ 
        ...messagesRef.current, 
        { createdAt: new Date().toLocaleTimeString(), value: msg }
      ]
      
      // persists data
      messagesRef.current = updated;
      // re-renders DOM so changes visible
      setMessages(updated);
    }

    //TODO make a socketHandler function that groups this into one function with on/off param
    mainSocket.on('chat message', chatListener);
    mainSocket.on('new user', logMessage)
    mainSocket.on('user left', logMessage)

    return () => {
      mainSocket.off("chat message", chatListener);
      mainSocket.off('new user', logMessage)
      mainSocket.off('user left', logMessage)
   }
  }, [])
  
  const onSendMessage = e => {
    e.preventDefault();
    if (!message) {
      setIsEmpty(true);
    } else {
      mainSocket.emit('chat message', { message, roomName });
      setIsEmpty(false);
      setMessage('');
    }
  }

  const onLeaveRoom = () => {
    mainSocket.emit('leave room', roomName);
    navigate('/');
  }
  


  return (
    <div id="room-page" className="page">
      <form onSubmit={onSendMessage}>
        <ul id="messages">
          {messages.map(message => (
            <li>{`${message.createdAt}: ${message.value}`}</li>
          ))}
        </ul>
        <div id="submit-container">
          <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)}/>
          <button>Send Message</button>
          {isEmpty && <p className="error-message">Cannot be empty.</p>}
        </div>
      </form>
      <button onClick={onLeaveRoom}>Leave Room</button>
    </div>

  )
}