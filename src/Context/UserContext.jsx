import { createContext, useEffect, useState } from "react";
export let userContext = createContext();



export function UserContextProvider(props){
const [Token, setToken] = useState(null);

useEffect(()=>{
    if(localStorage.getItem('userToken') !==null){
        setToken(localStorage.getItem('userToken'));
    }
},[])

return <userContext.Provider value={ {Token, setToken} }> 
    {props.children}
</userContext.Provider>
}