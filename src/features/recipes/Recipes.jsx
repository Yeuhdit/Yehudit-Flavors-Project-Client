// //src/recipes/Recipes.jsx
// import { useSelector } from 'react-redux'
// import SingleRecipe from './SingleRecipe'
// import './Recipes.css'

// const Recipes = () => {
//   const recipesList = useSelector(state => state.recipes.allRecipes)

//   return (
//     <div className="recipes">
//       {recipesList.map(item => (
//         <SingleRecipe key={item._id} recipe={item} />
//       ))}
//     </div>
//   )
// }

// export default Recipes

// import { mockRecipes } from './recipesData.Js';

// const recipesList = mockRecipes;

// export default function Recipes() {
//   return (
//     <div>
//       {recipesList.map(recipe => (
//         <img
//           key={recipe._id}
//           src={recipe.imageUrl}
//           alt={recipe.name}
//           width="200"
//         />
//       ))}
//     </div>
//   );
// }

 import { mockRecipes } from './recipesData.Js';
const recipesList = mockRecipes;

export default function Recipes() {
  return (
    <div>
      {mockRecipes.map(recipe => (
        <div key={recipe._id}>
          <img src={recipe.imageUrl} alt={recipe.name} width="200" />
          <p>{recipe.name}</p>
        </div>
      ))}
    </div>
  );
}
