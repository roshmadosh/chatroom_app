import { useState, useContext } from 'react';
import { SocketContext } from '../hooks/useSocket';

type DisplayedMessage = {
  createdAt: string,
  value: string,
}
export function Message() {
  const [message ,setMessage] = useState('');
  const [messages, setMessages] = useState<DisplayedMessage[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const socket = useContext(SocketContext);
  
  const onSendMessage = e => {
    e.preventDefault();
    if (!message) {
      setIsEmpty(true);
    } else {
      socket.emit('chat message', message);
      setIsEmpty(false);
      setMessage('');
    }
  }
  
  socket.on('chat message', (msg: string) => {
    const updated: DisplayedMessage[] = [ ...messages, { createdAt: new Date().toLocaleTimeString(), value: msg }]
    setMessages(updated);
  })

  return (
    <form action="">
      <ul id="messages">
        {messages.map(message => (
          <li>{`${message.createdAt}: ${message.value}`}</li>
        ))}
      </ul>
      <div id="submit-container">
        <input type="text" required onChange={e => setMessage(e.target.value)}/>
        <button onClick={onSendMessage}>Send Message</button>
        {isEmpty && <p className="error-message">Cannot be empty.</p>}
      </div>
    </form>
  )
}