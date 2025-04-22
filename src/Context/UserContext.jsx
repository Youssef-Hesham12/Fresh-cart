import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
axios
export let userContext = createContext()

export default function UserContextProvider(props) {
    let [userLogin, setUserLogin] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {

            setUserLogin(localStorage.getItem('userToken'))
        }
    }, [])
    return <userContext.Provider value={{ userLogin, setUserLogin }}>
        {props.children}
    </userContext.Provider>

}





