import toast from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { useState } from "react";

function List({ todos, setTodos }) {
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState(null);
  const handleDelete = (id, e) => {
    e.stopPropagation();
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
    toast.success("Muvaffaqiyatli o'chirildi", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "red",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };

  const handleCompleted = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
    );
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleChange = (e, id) => {
    e.stopPropagation();
    setShowModal(true);
    setItemId(id);
  };

  return (
    <div className="container">
      {showModal && (
        <Modal
          todos={todos}
          setTodos={setTodos}
          itemId={itemId}
          setShowModal={setShowModal}
        />
      )}
      <ul className="flex flex-col gap-4">
        {todos &&
          todos.map((todo) => {
            return (
              <li
                key={todo.id}
                onClick={() => handleCompleted(todo.id)}
                className={`flex items-center gap-4 shadow-md px-4 py-4 ${
                  todo.isCompleted ? "opacity-60 bg-gray-400" : ""
                }`}
              >
                <span
                  className={`mr-auto ${
                    todo.isCompleted ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleChange(e, todo.id)}
                  className="btn btn-info text-white font-bold"
                >
                  <BiSolidPencil className="text-[18px]" />
                </button>

                <button
                  onClick={(e) => handleDelete(todo.id, e)}
                  className="btn btn-error text-white font-bold"
                >
                  <FaTrashAlt />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
export default List;
