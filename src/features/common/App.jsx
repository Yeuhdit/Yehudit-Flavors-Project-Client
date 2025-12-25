import './App.css'
import { Route, Routes } from 'react-router-dom'
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Navbar from './Navbar'
<Route path='/' element={<Home />} />;

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <Routes>
        <Route path='/' element={<div>דף הבית</div>}></Route>
      </Routes>
    </CacheProvider>
  )
}

export default App