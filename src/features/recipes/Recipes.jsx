// //src/recipes/Recipes.jsx

// }
import SingleRecipe from './SingleRecipe';
import { mockRecipes } from './recipesData.Js';

const Recipes = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
      {mockRecipes.map((recipe) => (
        <SingleRecipe key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipes;