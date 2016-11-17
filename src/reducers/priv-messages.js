import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export default function privMessages(state = { messages: [] }, action) {
  switch (action.type) {
  case 'PRIVMSG':
    return Object.assign({}, state, { messages: [
      ...state.messages,
      {
        target: action.payload.params[0],
        msg: action.payload.params[1]
      }
    ]});
  default:
    return state;
  }
}
