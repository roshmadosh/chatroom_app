import { createContext } from "react";
import { io } from 'socket.io-client';

/**
 *  Separated contexts from hooks to make imports more semantically consistent,
 *  (i.e. import { __Context } from '.../contexts', not '.../hooks')
 * 
 *  Contexts can't be created inside hooks bc 
 */

// --[TYPES]-- //

export type SocketType = {
  name: string,
  path: string
}

type SocketContextType = {
  store: { // an object containing keys with socket-type values
    [socket: string]: ReturnType<typeof io>,
  },
  addSockets: (sockets: SocketType[]) => void, 
}


// --[CONTEXTS]-- //
export const SocketContext = createContext<SocketContextType>(undefined);