import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { RouterProvider } from 'react-router-dom'
import { MyRouter } from './MyRouter'
import { Provider } from 'react-redux'
import store from './reduxStore'
import RecipesList from './components/recipes/RecipesList'

function App() {
  return (
    <Provider store={store}> 
      <RouterProvider router={MyRouter}/> 
  </Provider>
  )
}

export default App