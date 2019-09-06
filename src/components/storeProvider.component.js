import React, { createContext, useReducer, useContext } from "react";
import { initFirebase } from "../libs/firebase";

const StateContext = createContext();

const initialState = {
  config: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "CONFIG_UPDATE": {
      const newState = {
        ...state,
        config: {
          ...state.config,
          ...action.config
        }
      };

      initFirebase(state.config);

      return newState;
    }
    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const Store = () => useContext(StateContext);
