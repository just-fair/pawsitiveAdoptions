import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  {DogsContextProvider}  from './context/DogsContext';
import {RequestContextProvider} from './context/RequestContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DogsContextProvider>
      <RequestContextProvider>
      <App />
      </RequestContextProvider>
    </DogsContextProvider>
  </React.StrictMode>
);


