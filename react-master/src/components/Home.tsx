
import React, { createContext, useContext, useReducer, useState, Dispatch } from "react";
import { Action, currentContext, User } from "./User";
import Update from "./UpDate";
import LetterAvatar from "./Avatar";
import { Typography } from "@mui/material";

export type UseContextType = {
    currentUser: User;
    userDispatch: Dispatch<Action>;
};

const Home = () => {
    const [IsOpen, setIsOpen] = useState(false);

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
});  

  const handleSubmit = () => {
      setIsOpen(true)
    };

    return (
        <>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
                        HOME
                    </Typography>
<currentContext.Provider value={{ currentUser, userDispatch }}>

           
            <div>
                {IsOpen && <Update />}
                {IsOpen && <LetterAvatar />}
            </div>
          
        </currentContext.Provider>
        </> 
    );
}

export default Home;
