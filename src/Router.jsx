import { createBrowserRouter } from "react-router-dom";
import Login from "/components/Login";
import AddRecipe from "/components/AddRecipe";
import AdminPanel from "/components/AdminPanel";

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        errorElement: 'main error'
    },
    {
        path: "/add-recipe",
        element: <AddRecipe />,
        errorElement: 'main error'
    },
    {
        path: "/admin",
        element: <AdminPanel />,
        errorElement: 'main error'
    }
]);
export default Router;