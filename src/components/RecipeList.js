// react-client/src/components/RecipeList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, addRecipe, deleteRecipe } from '../features/recipesSlice';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleAddRecipe = (newRecipe) => {
    dispatch(addRecipe(newRecipe));
  };

  const handleDeleteRecipe = (id) => {
    dispatch(deleteRecipe(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            {recipe.name}
            <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* כאן הוסף תהליך הוספת מתכון */}
    </div>
  );
};

export default RecipeList;