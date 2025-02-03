
import React, { createContext, useContext, useReducer, useState, Dispatch } from "react";
import { Action, currentContext, User, userIdRes } from "./User";
import LogUp from "./LogUp";
import { Outlet } from "react-router-dom";
import Login from "./LogIn";
import Update from "./UpDate";
import LetterAvatar from "./Avatar";

// Define the context type
// export type UseContextType = {
//     user: User;
//     userDispatch: Dispatch<Action>; // Ensure Action type is correctly defined
// };

export type UseContextType = {
    currentUser: User;
    userDispatch: Dispatch<Action>;
};

//export const userId = createContext<{ id: string; setid: Dispatch<React.SetStateAction<string>> } | null>(null);

// Create context
//export const userContext = createContext<UseContextType | null>(null);

const Home = () => {
    const [IsOpen, setIsOpen] = useState(false)
   // const [login, setLogin] = useState(false);
  //  const [user, userDispatch] = useReducer(UserReducer, init);
 // const [userId,setUserId]=useState<string>('')
 const [currentUser, userDispatch] = useReducer((state: User, action: Action) => {
    switch (action.type) {
        case 'CREATE':
            return { ...action.new_data };
        case 'UPDATE':
            return { ...state, ...action.new_data };
        default:
            return state;
    }
}, {
    id: '',
    firstName: '',
    lastName: '',
    passward: '',
    email: '',
    address: '',
    phone: ''
});  // אתחול ברירת מחדל של המשתמש

  const handleSubmit = () => {
      setIsOpen(true)
    };

    return (
        <>
{/* <Outlet/>

  <userIdRes.Provider value={{userId,setUserId}}> 
              {IsOpen == false && <Login IsOpen={handleSubmit} />}
                {IsOpen == false && <LogUp IsOpen={handleSubmit} />}
                {IsOpen && <Update />}
                {IsOpen && <LetterAvatar />}
       </userIdRes.Provider> */}

<currentContext.Provider value={{ currentUser, userDispatch }}>
            {/* העטוף את כל הרכיבים במעגל הקונטקסט */}
            <Outlet/>
            <div>
                {IsOpen === false && <Login IsOpen={handleSubmit} />}
                {IsOpen === false && <LogUp IsOpen={handleSubmit} />}
                {IsOpen && <Update />}
                {IsOpen && <LetterAvatar />}
            </div>
        </currentContext.Provider>
        </> 

    );
}

export default Home;
