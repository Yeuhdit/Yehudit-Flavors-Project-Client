// //react-client/src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import App from './App';

// ReactDOM.render(    
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
//react-client/src/index.js
// react-client/src/index.js
import { createRoot } from 'react-dom/client';  // ← רק זה, בלי react-dom
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// אופציונלי: אפשר להוסיף StrictMode (מומלץ בפיתוח)
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);