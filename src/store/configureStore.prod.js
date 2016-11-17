import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import wsMiddleware from '../middleware/ws-middleware';

const finalCreateStore = compose(
  applyMiddleware(wsMiddleware, thunk)
)(createStore);

module.exports = function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
