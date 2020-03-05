import React from "react";
import { Provider } from 'react-redux';
import { getInitialStore } from "./state/index";
import AppContainer from "./components/containers/app/index";

import "./styles.css";

export function BrandywineEditor(props) {
  const initialStore = getInitialStore(props);
  return (
    <Provider store={initialStore}>
      <AppContainer />
    </Provider>
  );
}
