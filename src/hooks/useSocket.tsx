
import { io } from 'socket.io-client';
import { createContext, useContext } from 'react';

export const SocketContext = createContext(undefined);

export function useSocket(path?: string) {
  const socket = io(path);
  
  const SocketProvider = ({ children }) => {
    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    )
  }
  return SocketProvider
}