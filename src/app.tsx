import { createRoot } from 'react-dom/client';
import { useSockets } from './hooks';
import { Lobby } from './components';
import './scss/main.scss';


const App = () => {
  const { SocketProvider } = useSockets();

  return (
    <SocketProvider>
      <Lobby />
    </SocketProvider>
  )
}

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
