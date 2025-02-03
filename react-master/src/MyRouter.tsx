import React from "react"
import { BrowserRouter, createBrowserRouter, Route, Routes } from "react-router"
import AppLayout from "./components/AppLayout"
import Home from "./components/Home"
import LogIn from "./components/LogIn"
import Avatar from "./components/Avatar"
import UpDate from "./components/UpDate"
import RecipesList from "./components/recipes/RecipesList"
import ShowRecipe from "./components/recipes/ShowRecipe"
import AddRecipe from "./components/recipes/AddRecipe"
import RecipesLayout from "./components/recipes/RecipesLayout"


// export const MyRouter = createBrowserRouter([
//    {
//       path: '/',
//       element: <AppLayout />,
//       errorElement: <>error element</>,
//       children: [
//          { path: 'UpDate', element: <UpDate /> },
//          { path: '/', element: <Home /> },
//          {
//             path: '/RecipesList', element: <RecipesLayout />,
//             children: [
//                { path: 'Recipe/:id', element: <ShowRecipe /> },
//             ]
//          },
//          { path: '/AddRecipe', element: <AddRecipe /> },
//          { path: 'Recipe/:id/', element: <ShowRecipe />, errorElement: <>Error</> },

//       ]
//    },

// ])



export const MyRouter = createBrowserRouter([
   {
      path: '/',
      element: <AppLayout />,
      errorElement: <>error element</>,
      children: [
         { path: 'UpDate', element: <UpDate /> },
         // { path: '/AddRecipe', element: <AddRecipeForm /> },   
         {
            path: '/', element: <Home />,
            children: [            
               {
                  path: '/RecipesList', element: <RecipesLayout />,
                  children: [                     
                     { path: 'Recipe/:id', element: <ShowRecipe /> },
                    
                  ]                
               },  
               {path:'/AddRecipe',element:<AddRecipe />}            
            ]    
                    
        }, 
]
   }
])