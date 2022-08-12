import { useState, useContext } from 'react';
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

  const { store: { mainSocket } } = useContext(SocketContext);
  const { roomName } = useParams();
  
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
  
  mainSocket.on('chat message', (msg: string) => {
    const updated: DisplayedMessageType[] = [ 
      ...messages, 
      { createdAt: new Date().toLocaleTimeString(), value: msg }
    ]
    
    setMessages(updated);
  })

  mainSocket.on('new user', message => {
    console.log(message);
  })

  return (
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
  )
}