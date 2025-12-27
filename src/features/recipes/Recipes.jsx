//src/recipes/Recipes.jsx
import { useSelector } from 'react-redux'
import SingleRecipe from './SingleRecipe'
import './Recipes.css'

const Recipes = () => {
  const recipesList = useSelector(state => state.recipes.allRecipes)

  return (
    <div className="recipes">
      {recipesList.map(item => (
        <SingleRecipe key={item._id} recipe={item} />
      ))}
    </div>
  )
}

export default Recipes