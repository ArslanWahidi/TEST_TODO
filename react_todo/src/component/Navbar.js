import { useContext, useState } from "react";
import axios from "axios";
import React from "react";
import FetchContext from "../Contexts/FetchContext";

export function Navbar() {
  
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { token, setToken } = useContext(FetchContext);

  const onLogOutHandler = async () =>{
    try{
      const csrf_res = await fetch('/csrf_token');
      const csrf_data = await csrf_res.json();

      const res = await axios.post('/log_out_user/', {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf_data.csrfToken,
        }
      });

      if(res.status == 200){
        window.location = '/login_page/';
        setToken(false)
      }

    }catch(err){
      if(err.response.status === 401){
        window.location = '/login_page/'
      }
    }
  }

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between mb-3 bg-blue-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start space-x-20">
            <a
              className="text-md font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="http://127.0.0.1:8000"
            >
              Home
            </a>
            <a
              className="text-md font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="http://127.0.0.1:8000/completed"
            >
              Completed
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-white block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="https://twitter.com/intent/tweet"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Pin</span>
                </a>
              </li>
              {!!token ?
                <li className="nav-item">
                  <div className="cursor-default px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                    onClick={onLogOutHandler}
                    >
                    Log out
                  </div>
                </li> 
                  : 
                <>
                  <li className="nav-item">
                    <a className="px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/register_page"
                      >
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/login_page"
                      >
                      Login
                    </a>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
