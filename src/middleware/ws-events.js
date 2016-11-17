import { ircparse } from '../irc/irc';


export const onOpen = (ws,store) => evt => {
  //Send a handshake, or authenticate with remote end
  console.log('store on connect', store());
  //Tell the store we're connected
  //store.dispatch(connected(ws));
  console.log('connected');
  //store.dispatch({ type: 'SEND_CHAT_MESSAGE', irc_command:   "NICK " + nickname + " \n"});
  //store.dispatch({ type: 'SEND_CHAT_MESSAGE', irc_command:   "USER " + nickname + " * 0 :" + nickname + " \n"});
}

export const onClose = (ws,store) => evt => {
  //Tell the store we've disconnected
  //store.dispatch(actions.disconnected());
}

export const onError = (ws,store) => evt => {
  console.log('error', evt);
  //store.dispatch(actions.disconnected());
}


export const onMessage = (ws,store, dispatch) => evt => {
  //Parse the JSON message received on the websocket

  var msg = ircparse(evt.data);
  console.log('irc message:', msg);
  if (msg.command === 'PING') {
    ws.send('PONG\n');
  } else {
    dispatch({ type: msg.command, payload: msg });
  }
}
