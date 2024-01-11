import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const List = ({ item }) =>{

    const [modalOn, setModalOn] = useState(false);
    const [editModalOn, setEditModalOn] = useState(false);

    return (
        <div className="mb-5 shadow-md">
            {/* Display data */}
            <div className="bg-gray-100 rounded p-4 mb-2">
                <div className="flex items-center">
                    <h3 className="text-lg font-bold mr-2">{item.title}</h3>
                    <div className="flex items-center ml-auto">
                        <button className="mr-2">
                            <FaEdit onClick={() => setEditModalOn(true)}/>
                        </button>
                        <button onClick={() => setModalOn(true)}>
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600">{item.description}</p>
            </div>

            {modalOn && <DeleteModal onCloseModel={setModalOn} id={item.id} />}
            {editModalOn && <EditModal id={item.id} onCloseModel={setEditModalOn} data={item} />}

        </div>
    );

}

export default List;