import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import store from './Store';
import { Provider } from "react-redux";
import { ContextProvider } from './components/context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ContextProvider>
);
