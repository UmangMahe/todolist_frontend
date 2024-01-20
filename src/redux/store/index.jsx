import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

function configureStore(preloadedState) {
 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureStore();

export default store;

