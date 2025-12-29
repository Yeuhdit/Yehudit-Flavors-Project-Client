//src/features/recipes/SingleRecipe.jsx
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