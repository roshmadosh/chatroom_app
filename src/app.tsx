import { createRoot } from 'react-dom/client';
import { useSockets } from './hooks';
import { Lobby, Room } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './scss/main.scss';


const App = () => {
  const { SocketProvider } = useSockets();

  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Lobby />} />
          <Route path='room/:roomName' element={<Room />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  )
}

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
