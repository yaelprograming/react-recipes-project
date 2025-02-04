import { useReducer } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { MyRouter } from './MyRouter'
import { Provider } from 'react-redux'
import store from './reduxStore'
import { currentContext, userReducer } from './components/User'

function App() {

  const [currentUser, userDispatch] = useReducer(userReducer, {
    id: '',
    firstName: '',
    lastName: '',
    passward: '',
    email: '',
    address: '',
    phone: '',
  });

  return (
    <Provider store={store}>
      <currentContext.Provider value={{ currentUser, userDispatch }}> 
        <RouterProvider router={MyRouter} />
      </currentContext.Provider>
    </Provider>
  )
}

export default App