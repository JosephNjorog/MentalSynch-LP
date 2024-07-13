import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/App.css'; // Adjust the path as necessary
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you're using reportWebVitals for performance measurement
reportWebVitals();
