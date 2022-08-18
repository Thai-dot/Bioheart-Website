import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { sessionService } from "redux-react-session";

import { RecoilRoot } from "recoil";


import App from "./app";

import configureStore from "./redux/store/index";

const store = configureStore();
sessionService.initSessionService(store);

ReactDOM.render(
  <RecoilRoot>
  <Provider store={store}>
    
      <App />
    
  </Provider>
  </RecoilRoot>
  ,
  document.getElementById("root")
);
