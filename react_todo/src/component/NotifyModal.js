import React from "react";
import FetchContext from "../Contexts/FetchContext";
import { useContext } from "react";
const NotifyModal = ({ title, onNotifyModalOn }) => {
  const { FetchDataHandler } = useContext(FetchContext);

  async function NotifyModalOnHandler() {
    FetchDataHandler();
    onNotifyModalOn(false);
  }

  return (
    <div className="bg-zinc-200 opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-600 rounded-xl">
          <div className="flex  text-lg text-zinc-600 mb-10">
            The "{title}" TODO is deleted
          </div>
          <div className="flex justify-center">
            <button
              onClick={NotifyModalOnHandler}
              className="rounded px-4 py-2 text-white bg-blue-500 hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyModal;
