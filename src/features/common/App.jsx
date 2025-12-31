//src/features/common/App.jsx
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from '@mui/stylis-plugin-rtl'
import { prefixer } from 'stylis'

import Navbar from './Navbar'
import Home from './Home'
import Recipes from '../recipes/Recipes'
import { getAllCategories } from '../categories/categorySlice'
import { getAllRecipes } from '../recipes/recipeSlice'
import RecipeDetail from '../recipes/RecipeDetail';

const cacheRtl = createCache({
  key: 'rtl',
  stylisPlugins: [prefixer, rtlPlugin]
})

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllRecipes())
  }, [])

  return (
    <CacheProvider value={cacheRtl}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
         {/* <Route path="/gallery" element={<Gallery />} />  */}
  <Route path="/recipe/:id" element={<RecipeDetail />} />

      </Routes>
    </CacheProvider>
  )
}

export default App