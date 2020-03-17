import React from "react";
import { Provider } from 'react-redux';
import { getInitialStore } from "./state/index";
import AppContainer from "./components/containers/app/index";

import { editorPropTypes } from '../user-prop-types';
import "../styles.css";

function BrandywineEditor(props) {
  const initialStore = getInitialStore(props);
  return (
    <Provider store={initialStore}>
      <AppContainer />
    </Provider>
  );
}
BrandywineEditor.propTypes = editorPropTypes;
export { BrandywineEditor };
