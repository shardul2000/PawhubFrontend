import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import {Provider} from 'react-redux';
import store from './store/index.js';

ReactDOM.render(
  
    <Provider store ={store}>
      
      <App />
      
   
    </Provider>
  , document.getElementById("root"));

