import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  AuthProvider  from './Contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider> 
  </React.StrictMode>
);


// ReactDOM.createRoot(
//   document.getElementById("root"),
// )
// .render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );



reportWebVitals();
