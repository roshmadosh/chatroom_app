import { createContext } from "react";
import { io } from 'socket.io-client';
import { SocketType } from '../types';

/**
 *  Separated contexts from hooks to make imports more semantically consistent,
 *  (i.e. import { __Context } from '.../contexts', not '.../hooks')
 * 
 *  Contexts can't be created inside hooks bc 
 */

// --[TYPES]-- //

// an object containing keys with socket-type values
type SocketContextType = {
  store: {
    [socket: string]: ReturnType<typeof io>,
  },
  addSockets: (sockets: SocketType[]) => void, 
}


// --[CONTEXTS]-- //
export const SocketContext = createContext<SocketContextType>(undefined);