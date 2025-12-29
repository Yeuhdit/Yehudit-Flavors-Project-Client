// //src/features/recipes/recipeSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// export const getAllRecipes = createAsyncThunk(
//   'recipes/getAll',
//   async () => {
//     return [
//       { _id: 'r1', name: 'פסטה שמנת' },
//       { _id: 'r2', name: 'עוף בתנור' }
//     ]
//   }
// )

// const recipeSlice = createSlice({
//   name: 'recipes',
//   initialState: {
//     allRecipes: [],
//     status: null
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getAllRecipes.fulfilled, (state, action) => {
//       state.allRecipes = action.payload
//       state.status = 'fulfilled'
//     })
//   }
// })

// export default recipeSlice.reducer
// import React from 'react';

// const SingleRecipe = ({ recipe }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105">
//       <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h3 className="text-lg font-bold">{recipe.name}</h3>
//         <div className="flex gap-2 mt-2">
//           <span className="px-3 py-1 rounded-full bg-primary/20 text-primary">{getDifficulty(recipe.difficulty)}</span>
//           <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary">{recipe.type}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleRecipe;
const getDifficulty = (level) => {
  if (level === 1) return 'קל'
  if (level === 2) return 'בינוני'
  if (level === 3) return 'קשה'
  return ''
}

export default function SingleRecipe({ recipe }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105">
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{recipe.name}</h3>
        <div className="flex gap-2 mt-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600">
            {getDifficulty(recipe.difficulty)}
          </span>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-600">
            {recipe.type}
          </span>
        </div>
      </div>
    </div>
  )
}