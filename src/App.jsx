// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from '@mui/stylis-plugin-rtl'
import { prefixer } from 'stylis'
import Navbar from './features/common/Navbar' // ודא שהנתיב נכון
import Home from './features/common/Home' // ודא שהנתיב נכון
import Recipes from './features/recipes/Recipes' // ודא שהנתיב נכון
import RecipeDetail from './features/recipes/RecipeDetail'; // ודא שהנתיב נכון
import Login from './components/Login' // ודא שהנתיב נכון
import Register from './components/Register' // ודא שהנתיב נכון
import { getAllCategories } from './features/categories/categorySlice' // נתיב נכון
import { getAllRecipes } from './features/recipes/recipeSlice' // נתיב נכון

const cacheRtl = createCache({
  key: 'rtl',
  stylisPlugins: [prefixer, rtlPlugin]
})

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllRecipes())
  }, [dispatch])

  return (
    <CacheProvider value={cacheRtl}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </CacheProvider>
  )
}

export default App;