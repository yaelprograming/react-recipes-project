import {  createBrowserRouter } from "react-router"
import AppLayout from "./components/AppLayout"
import Home from "./components/Home"
import ShowRecipe from "./components/recipes/ShowRecipe"
import AddRecipe from "./components/recipes/AddRecipe"
import RecipesLayout from "./components/recipes/RecipesLayout"
import About from "./components/About"
import EditRecipe from "./components/recipes/EditRecipe"

export const MyRouter = createBrowserRouter([
   {
      path: '/',
      element: <AppLayout />,
      errorElement: <>error element</>,
      children: [
         // { path: 'UpDate', element: <UpDate /> },
         // { path: '/AddRecipe', element: <AddRecipeForm /> },   

         { path: '/', element: <Home />, },
         { path: "/About", element: <About /> },

         {
            path: '/RecipesList', element: <RecipesLayout />,
            children: [
               { path: 'Recipe/:id', element: <ShowRecipe /> },

            ]
         },
         { path: '/AddRecipe', element: <AddRecipe /> },
         { path: "/edit-recipe/:id", element: <EditRecipe /> }
      ]
   }
])