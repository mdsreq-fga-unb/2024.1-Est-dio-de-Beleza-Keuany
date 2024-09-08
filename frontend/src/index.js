import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes'; 
import { Provider } from 'react-redux'; 
<<<<<<< HEAD
import store from './store'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



=======
import store from './store';
import { AuthProvider } from './contexts/AuthContext';
>>>>>>> ffc408aec268f4e599cd8a648b1cb050b41a9df5

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

