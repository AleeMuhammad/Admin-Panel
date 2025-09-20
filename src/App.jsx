import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import CategoriesDetails from "./pages/Categories/CategoriesDetails";
import Categories from "./pages/Categories/Categories";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./NotFound";
import FirebaseNotificationListener from "./components/FirebaseNotificationListener";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {path: "/",element: <Dashboard />},
        {path: "profile",element: <Profile />},
        {path: "categories",element: <Categories />,},
        {path: "categories/:id",element: <CategoriesDetails />,},
        {path: "users",element: <Users />,},
        {path: "order-details",element: <OrderDetails />,},
      ],
    },
    {path: "/login",element: <Login />},
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <FirebaseNotificationListener/>
    </>
  );
}

export default App;
