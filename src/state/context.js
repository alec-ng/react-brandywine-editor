import React, { createContext, useReducer, useContext } from "react";

/**
 * React context to use for global state
 */
const StateContext = createContext();

/**
 * HOC to be used in top level component to provide state to rest of app
 */
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

/**
 * Hook to get the current value of the state context, which will be 
 * the global store and a dispatch method
 */
export const useStateValue = () => useContext(StateContext);
