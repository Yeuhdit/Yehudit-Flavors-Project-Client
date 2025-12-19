// src/main.jsx
// •`StrictMode` הוא רכיב שנמצא בתוך ספריית React. זהו קומפוננט שמסייע לזהות בעיות פוטנציאליות בקוד במהלך הפיתוח.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './features/common/store.js' 
import { HashRouter as Router } from 'react-router-dom'
// import App from './features/common/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
)