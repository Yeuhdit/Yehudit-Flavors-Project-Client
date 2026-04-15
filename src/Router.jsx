// // react-client/src/Router.jsx
// import { createBrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import AddRecipe from "./components/AddRecipe";
// import AdminPanel from "./components/AdminPanel";
// import About from "./features/common/About";
// import Home from "./features/common/Home";
// import Contact from "./components/Contact"; // ✅ הוסף זאת


// const Router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />,
//         errorElement: <div>שגיאה בדף הבית</div>
//     },
//     {
//         path: "/login",
//         element: <Login />,
//         errorElement: <div>שגיאה בדף Login</div>
//     },
//      {
//         path: "/contact", 
//         element: <Contact />,
//         errorElement: <div>שגיאה בדף צור קשר</div>
//     },
//     {
//         path: "/add-recipe",
//         element: <AddRecipe />,
//         errorElement: <div>שגיאה בדף AddRecipe</div>
//     },
//     {
//         path: "/admin",
//         element: <AdminPanel />,
//         errorElement: <div>שגיאה בדף AdminPanel</div>
//     },
//     {
//         path: "/about",
//         element: <About />,
//         errorElement: <div>שגיאה בדף About</div>
//     }
// ]);

// export default Router;