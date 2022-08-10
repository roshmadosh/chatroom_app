import { createRoot } from 'react-dom/client';
import { useSockets } from './hooks';
import { Room } from './components';
import './scss/main.scss';


const App = () => {
  const { SocketProvider } = useSockets();

  return (
    <SocketProvider>
      <Room />
    </SocketProvider>
  )
}

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
