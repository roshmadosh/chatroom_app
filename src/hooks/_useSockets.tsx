
import { io } from 'socket.io-client';
import { useCallback } from 'react';
import { SocketType, SocketContext } from '../contexts';

/**
 * Creates web sockets and initializes the socket context with getter and setter. Returns the provider for the socket context.
 * @param initialSockets // for any additional namespaces
 * @returns 
 */
export function useSockets(initialSockets?: SocketType[]) {

  // init
  initialSockets && addSockets(initialSockets);

  // creates store with initial socket
  const store = {
    mainSocket: useCallback(() => io(), [])(), // useCallback makes socket instance a singleton
  }

  // handler for updating socket store.
  function addSockets(sockets: SocketType[]): void {
    sockets.forEach(socket => {
      store[socket.name] = useCallback(() => io(socket.path), [])()
    })
  }

  // provider for accessing sockets
  const SocketProvider = ({ children }) => {
    return (
      <SocketContext.Provider value={{ store, addSockets }}>
        {children}
      </SocketContext.Provider>
    )
  }

  // --[RETURN]-- //
  return {
    SocketProvider
  }
}

