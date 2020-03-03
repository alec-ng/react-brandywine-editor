import React from "react";
import { generateStateFromProps } from "./state/index";
import { StateProvider } from './state/context';
import { MainReducer } from "./state/reducers/index";
import AppContainer from "./components/containers/app/index";

import "./styles.css";

export function BrandywineEditor(props) {
  const initialState = generateStateFromProps(props);
  return (
    <StateProvider initialState={initialState} reducer={MainReducer}>
      <AppContainer />
    </StateProvider>
  );
}
