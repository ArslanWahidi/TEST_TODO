import React, { createContext, useState } from "react";

const FetchContext = createContext()


export const FetchContextProvider = ({children}) =>{
  const [todoItems, setTodoItems] = useState([]);
  const [ token, setToken ] = useState(localStorage.getItem('login'));

  const FetchDataHandler = async () =>{
    try{
      const res = await fetch('/task_list',)
      const todoList = await res.json()
      setTodoItems(todoList)
      }catch (error){
        console.log(`Error catched ${error}`);
      }
    }

    return (
        <FetchContext.Provider value={{ todoItems, FetchDataHandler, setTodoItems, token, setToken }}>{children}</FetchContext.Provider>
    );
}

export default FetchContext;