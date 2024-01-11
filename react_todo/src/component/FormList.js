import React, { useState, useContext } from "react";
import FetchContext from "../Contexts/FetchContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const FormList = () => {
  const [hideForm, setHideForm] = useState(true);
  function HideFormHandler() {
    setHideForm((preHideForm) => !preHideForm);
  }
  
  // Adding new data to list my solution.

  // const { FetchDataHandler, setTodoItems } = useContext(FetchContext);
  // const onSubmitNewTodoHandler = async (event) => {
    //   event.preventDefault();
    
    //   const formDatas = new FormData(event.target);
    //   const titleData = formDatas.get("title");
    //   const descriptionData = formDatas.get("description");
    
    //   try {
      //     const csrf_res = await fetch("http://127.0.0.1:8000/csrf_token/");
      //     const csrf_data = await csrf_res.json();
      //     FetchDataHandler();
      //     await fetch("http://127.0.0.1:8000/task_create/", {
        //       method: "POST",
        //       headers: {
          //         "Content-Type": "application/json",
  //         "X-CSRFToken": csrf_data.csrfToken,
  //       },
  //       body: JSON.stringify({
    //         title: titleData.toString(),
  //         description: descriptionData.toString(),
  //       }),
  //     });
  
  //     let formInputs = event.target;

  //     let titleInput = formInputs.elements.title;
  //     titleInput.value = "";
  //     let descriptionInput = formInputs.elements.description;
  //     descriptionInput.value = "";

  //     FetchDataHandler();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Adding new to list by the Tanstack query.

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData) =>{
      const csrf_res = await fetch("/csrf_token/");
      const csrf_data = await csrf_res.json();

      await axios.post('/task_create/', newData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf_data.csrfToken,
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ['task_list']}, {exact: true})
    }
  })

  const { isPending } = mutation;

  const onSubmitNewTodoHandler = async (event) => {
    event.preventDefault();

    const formDatas = new FormData(event.target);
    const titleData = formDatas.get("title");
    const descriptionData = formDatas.get("description");

    // Data from input fields give to mutate as the object. 
    mutation.mutate({
      title: titleData,
      description: descriptionData
    })

    let formInputs = event.target;

    let titleInput = formInputs.elements.title;
    titleInput.value = "";

    let descriptionInput = formInputs.elements.description;
    descriptionInput.value = "";
  };

  return (
    <div className="bg-gray-50 p-3 shadow">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-left">Add New TODO</h2>
        <div>
          {isPending ? 
            <>
              <span>Adding New Todo</span> <FontAwesomeIcon spin icon={faSpinner} size='1x' /> 
            </>
            : null}
        </div>
        <button
          className="bg-blue-500 mb-4 hover:bg-blue-700 text-white px-4 rounded"
          onClick={HideFormHandler}
        >
          {hideForm ? "Hide Form" : "Show Form"}
        </button>
      </div>
      {hideForm && (
        <form className="mb-5" onSubmit={onSubmitNewTodoHandler}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Title"
            />
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Description"
            ></textarea>
          </div>

          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit">
            ADD
          </button>
        </form>
      )}
    </div>
  );
};

export default FormList;
