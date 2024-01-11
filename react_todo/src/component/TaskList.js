import React, { useContext, useEffect } from "react";
import List from "./List";
import FetchContext from "../Contexts/FetchContext";
import axios from 'axios';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const TaskList = () => {

  // Old method for fetching data my solution.
  // const { todoItems, FetchDataHandler } = useContext(FetchContext);
  // useEffect(() => {
  //   FetchDataHandler();
  // }, []);

  // New Method for fetching data by the Tanstack query.

  const { setToken } = useContext(FetchContext);

  const { data, isLoading, isRefetching, isError } = useQuery({
    queryKey: ['task_list'],
    queryFn: async () => {

      try{
        const res = await axios.get('/task_list', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        })
        console.log('try block run from task')

        return res.data;
      }catch(err){
        console.log('error block run from task')

        if(err.response.status === 401){
          console.log(err.response.status)
          setToken(null);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
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
      {data?.map((item) => {
        if (item.completed === false) {
          return <List key={item.id} item={item} />;
        }
        return [];
      })}
    </div>
  );
};

export default TaskList;
