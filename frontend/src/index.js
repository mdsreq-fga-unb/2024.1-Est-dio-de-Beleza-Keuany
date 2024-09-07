import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes'; 
import { Provider } from 'react-redux'; 
import store from './store';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <Provider store={store}>
      <Routes /> 
    </Provider>
  </AuthProvider> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

