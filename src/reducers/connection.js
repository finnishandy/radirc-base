import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export default function wsConnection(state = false, action) {
  switch (action.type) {
  case 'CONNECTION_ESTABLISHED':
    return true;
  default:
    return state;
  }
}
