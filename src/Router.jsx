import { createBrowserRouter } from "react-router-dom";
import Login from "/components/Login";
const Router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        errorElement: 'main error'
        
    }
]);
export default Router;