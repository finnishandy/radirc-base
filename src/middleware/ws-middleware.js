'use strict';

import { onOpen, onClose, onMessage, onError } from './ws-events';

let socket = undefined;

export default function wsMiddleware({ getState, dispatch }) {
  return (next) => (action) => {
    //console.log('will dispatch', action)

    switch(action.type) {

      //The user wants us to connect
      case 'CONNECT':
        //Start a new connection to the server
        if(socket != null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        //store.dispatch(actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)
        socket = new WebSocket(action.url);
        socket.onmessage = onMessage(socket, getState, dispatch);
        socket.onclose = onClose(socket, getState);
        socket.onopen = onOpen(socket, getState);
        socket.onerror = onError(socket, getState);
        dispatch({type: 'CONNECTION_ESTABLISHED'});
        break;
      case 'IRC_SEND':
        socket.send(action.command);
        break;
      default:
        break;
    }
    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    //console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}