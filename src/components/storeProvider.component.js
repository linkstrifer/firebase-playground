import React, { createContext, useReducer, useContext } from 'react';
import { initFirebase } from '../libs/firebase';

const StateContext = createContext();

const Cache = window.localStorage;

const initialState = JSON.parse(Cache.getItem('state')) || {
  config: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};

console.info('INITIAL STATE:', initialState);

initFirebase(initialState.config);

function reducer(state, action) {
  switch (action.type) {
    case 'CONFIG_UPDATE': {
      const newState = {
        ...state,
        config: {
          ...state.config,
          ...action.config,
        },
      };

      initFirebase(state.config);

      return newState;
    }
    default:
      return state;
  }
}

function cacheStore(state) {
  Cache.setItem('state', JSON.stringify(state));
}

function middlewares(state, action) {
  console.info('PREV STATE:');
  console.table(state);
  const currentState = reducer(state, action);

  cacheStore(currentState);

  console.info('NEXT STATE:');
  console.table(currentState);

  return currentState;
}

export default function StoreProvider({ children }) {
  return (
    <StateContext.Provider value={useReducer(middlewares, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const Store = () => useContext(StateContext);
