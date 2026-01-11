// //src/main.jsx
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
// import { HashRouter as Router } from 'react-router-dom'
// import { store } from './features/common/store'
// import App from './features/common/App'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Router>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </Router>
//   </StrictMode>
  
// )
// src/main.jsx   (או index.js – תשני את השם ל-main.jsx אם צריך)
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';  // חובה ל-router!
// import { store } from './app/store';
// import App from './features/common/App';  // או './App' – תבדקי את הנתיב המדויק

// // React 18 – שיטה חדשה
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';  // ← עכשיו זה יעבוד!
import App from './features/common/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);