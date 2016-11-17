'use strict';

let nickname = 'foo';

export default function ircMiddleware({ getState, dispatch }) {
  return (next) => (action) => {
    //console.log('will dispatch', action)

    switch(action.type) {

      //The user wants us to connect
      case 'NOTICE':
        //Start a new connection to the server

        // it seems that we wont be able to register unless we have received something from the server
        if (action.payload && action.payload.params && action.payload.params[0] === 'Auth') {
          dispatch({ type: 'AUTHENTICATED' });
          dispatch({ type: 'IRC_SEND', command: 'NICK ' + nickname + '\n' });
          dispatch({ type: 'IRC_SEND', command: 'USER ' + nickname + ' * 0 :' + nickname + '\n' });
        }
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