import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import authSlice, { setAuth } from "./Page/contentPage/member/authSlice";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import storageSession from "redux-persist/lib/storage/session"
import { PersistGate } from "redux-persist/integration/react";
import resentViewSlice from "./Page/basepage/resentViewSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const persistedResentViewReducer = persistReducer(persistConfig,resentViewSlice);

// store
// reducer(slice) 등록
const storee = configureStore({
  reducer: {
    authindex: persistedAuthReducer,
    rsntView:persistedResentViewReducer,
  },
});
// const storee = configureStore({
//   reducer: {
//     authindex: authSlice,
//   },
// });

const persistor = persistStore(storee);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={storee}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// Add the 'beforeunload' event listener after rendering the React app
window.addEventListener('beforeunload', (event) => {
  // Access the isLogined value from local storage directly
  const isLogined = JSON.parse(localStorage.getItem('persist:root')).auth;
  
  // If the user is logged in, dispatch the logout action
  if (isLogined) {
    storee.dispatch(setAuth({ isLogined: false, memberId: "" }));
  }

  // const confirmationMessage =
  //   'Changes you made may not be saved. Are you sure you want to leave?';
  // (event || window.event).returnValue = confirmationMessage;
  // return confirmationMessage;
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
