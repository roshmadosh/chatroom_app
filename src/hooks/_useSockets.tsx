
import { io } from 'socket.io-client';
import { useCallback } from 'react';
import { SocketContext } from '../contexts';
import { SocketType } from '../types';


/**
 * Creates web sockets and a context for accessing and updating them. Returns the provider for the context.
 * @param initialSockets // for additional namespaces
 * @returns 
 */
export function useSockets(initialSockets?: SocketType[]) {
  // creates store with initial socket
  const store = {
    mainSocket: useCallback(() => io(), [])(), // useCallback makes socket instance a singleton
  }

  // creates any additional web sockets
  initialSockets && addSockets(initialSockets);

  // handler for updating socket store.
  function addSockets(sockets: SocketType[]): void {
    sockets.forEach(socket => {
      store[socket.name] = useCallback(() => io(socket.path), [])()
    })
  }

  // provider for accessing sockets
  const SocketProvider = ({ children }) => {
    return (
      <SocketContext.Provider value={{ addSockets, store }}>
        {children}
      </SocketContext.Provider>
    )
  }

  // --[RETURN]-- //
  return {
    SocketProvider
  }
}

