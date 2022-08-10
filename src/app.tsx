import { createRoot } from 'react-dom/client';
import { useSocket } from './hooks/useSocket';
import { Message } from './components/Message';
import './scss/main.scss';


const App = () => {
  const SocketProvider = useSocket();

  return (
    <SocketProvider>
      <Message />
    </SocketProvider>
  )
}

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
