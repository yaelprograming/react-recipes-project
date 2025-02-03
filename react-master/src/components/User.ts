import React, { createContext, useContext } from "react"

export type User={
    id:string,
    firstName:string,
    lastName:string,
    passward:string,
    email:string,
    address:string,
    phone:string
}
export type reducerType={
    currentUser:User,
    dispatch:React.Dispatch<Action>
}
export const currentContext=createContext<reducerType|null>(null)
export const userIdRes=createContext<string>('')
export type Action={
    type:'CREATE'|'UPDATE'|'GET'|'REMOVE',
    new_data:User
}
export const userReducer=(current:User,action:Action)=>{
    switch(action.type)
    {
        case 'CREATE':
            const {id,email,passward}=action.new_data
            return {
                id:id,
                firstName:'',
                lastName:'',
                passward:passward,
                email:email,
                address:'',
                phone:''
             }
        case 'UPDATE':
            return {
                id:current.id,
                firstName:action.new_data.firstName||'',
                lastName:action.new_data.lastName||'',
                passward:current.passward,
                email:current.email,
                address:action.new_data.address||'',
                phone:action.new_data.phone||''}
        default:
            return current

    }

}