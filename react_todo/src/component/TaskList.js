import React, { useContext, useEffect } from "react";
import List from "./List";
import FetchContext from "../Contexts/FetchContext";
import axios from 'axios';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import AccessTokenAPI from "../AccessTokenAPI";
import { toast } from "react-toastify";

const TaskList = () => {

  // Old method for fetching data my solution.
  // const { todoItems, FetchDataHandler } = useContext(FetchContext);
  // useEffect(() => {
  //   FetchDataHandler();
  // }, []);

  // New Method for fetching data by the Tanstack query.

  const { setToken } = useContext(FetchContext);

  const { data, isLoading, isRefetching, isError, isSuccess } = useQuery({
    queryKey: ['task_list'],
    queryFn: async () => {
      try{
        const res = await AccessTokenAPI.get('/task_list', 
        {
          headers: {
            "Content-Type": "application/json",
          }
        })
        return res.data;
      }catch(err){
        if(err.response.status === 401){
          setToken(null);
        }
        if(err.response.status === 400){
          toast('You have to login in order to enable functinality.');
        }
      }

    },
    refetchOnWindowFocus: false
  });

  return (
    <div className="p-3">
      <h2 className="text-lg font-bold mb-3">List of Content</h2>
      {isError ? 
        <div className="text-center">
          You have to login in order to see your TODOS.
        </div>
        :
        isLoading || isRefetching ? 
        <div className="text-center mb-[5px]">
          Bring Latest Updates <FontAwesomeIcon spin icon={faSpinner} size='1x' /> 
        </div>
        : null
      }
      {isSuccess ? data?.map((item) => {
        if (item.completed === false) {
          return <List key={item.id} item={item} />;
        }
        return [];
      }) : null}
    </div>
  );
};

export default TaskList;
