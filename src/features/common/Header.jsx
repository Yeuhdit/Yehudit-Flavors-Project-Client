// // //src/features/common/Header.jsx
// // import { TextField, IconButton, Chip } from '@mui/material'
// // import SearchIcon from '@mui/icons-material/Search'
// // import { useSelector } from 'react-redux'
// // import './Home.css'

// // const difficulties = ['קל', 'בינוני', 'קשה']

// // const Header = () => {
// //   const categories = useSelector(state => state.categories.allCategories)

// //   return (
// //     <div className="homeText">
// //       <TextField
// //         fullWidth
// //         placeholder="מה תרצו להכין היום?"
// //         InputProps={{
// //           endAdornment: (
// //             <IconButton>
// //               <SearchIcon />
// //             </IconButton>
// //           )
// //         }}
// //       />

// //       <div className="flex-center">
// //         {categories.map(cat => (
// //           <Chip key={cat._id} label={cat.description} />
// //         ))}
// //       </div>

// //       <div className="flex-center">
// //         {difficulties.map(d => (
// //           <Chip key={d} label={d} />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // export default Header
// // src/features/common/Header.jsx
// import { IconButton } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search'
// import { useSelector } from 'react-redux'
// import './Home.css'

// const difficulties = ['קל', 'בינוני', 'קשה']

// const Header = () => {
//   const categories = useSelector(state => state.categories.allCategories)

//   return (
//     <div className="p-6 bg-gradient-to-r from-primary to-accent text-white rounded-b-3xl shadow-md">
//       <input
//         type="text"
//         placeholder="מה תרצו להכין היום?"
//         className="w-full p-4 rounded-full border-none focus:ring-2 focus:ring-white"
//       />
//       <div className="flex flex-wrap gap-3 mt-4 justify-center">
//         {categories.map(cat => (
//           <button key={cat._id} className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/40 text-white">
//             {cat.description}
//           </button>
//         ))}
//       </div>
//       <div className="flex flex-wrap gap-3 mt-4 justify-center">
//         {difficulties.map(d => (
//           <button key={d} className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/40 text-white">
//             {d}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Header
// src/features/common/Header.jsx
import { TextField, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'
import './Home.css'

const difficulties = ['קל', 'בינוני', 'קשה']

const Header = () => {
  const categories = useSelector(state => state.categories.allCategories)

  return (
    <div className="p-6 bg-gradient-to-r from-primary to-accent text-white rounded-b-3xl shadow-md">
      <TextField
        fullWidth
        placeholder="מה תרצו להכין היום?"
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
          className: "rounded-full border-none focus:ring-2 focus:ring-white"
        }}
      />

      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {categories.map(cat => (
          <button key={cat._id} className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/40 text-white">
            {cat.description}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {difficulties.map(d => (
          <button key={d} className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/40 text-white">
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Header