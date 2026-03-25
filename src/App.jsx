
// react-client/src/App.jsx

import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from '@mui/stylis-plugin-rtl'
import { prefixer } from 'stylis'

import Navbar from './features/common/Navbar'
import Home from './features/common/Home'
import About from './features/common/About'
import Recipes from './features/recipes/Recipes'
import RecipeDetail from './features/recipes/RecipeDetail';
import MyRecipes from './features/recipes/MyRecipes'; // הייבוא החדש

import Login from './components/Login'
import Register from './components/Register'
import AddRecipe from './components/AddRecipe'
import AdminPanel from './components/AdminPanel'

import { getAllCategories } from './features/categories/categorySlice'
import { getAllRecipes } from './features/recipes/recipeSlice'
import { getAllLevels } from './features/levels/levelSlice'

const cacheRtl = createCache({
  key: 'rtl',
  stylisPlugins: [prefixer, rtlPlugin]
})

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllRecipes())
    dispatch(getAllLevels())
  }, [dispatch])

  return (
    <CacheProvider value={cacheRtl}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        
        {/* הראוט החדש למתכונים שלי */}
        <Route path="/my-recipes" element={<MyRecipes />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<AddRecipe />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </CacheProvider>
  )
}

export default App;