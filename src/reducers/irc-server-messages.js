import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export default function ircServerMessages(state = { AUTHENTICATED: false }, action) {
  console.log('ircServerMessages state', state);
  switch (action.type) {
  case 'AUTHENTICATED':
    return { AUTHENTICATED: true };
  default:
    return state;
  }
}
