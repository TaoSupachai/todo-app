import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import styles from "../styles/modules/todoAdd.module.scss";
import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoAdd() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    title && title !== "" && setShowAdd(true);
    title === '' && setShowAdd(false);
  }, [title]);


  const handleAdd = (e) => {
    e.preventDefault();
    if (title && title !== "") {
      dispatch(
        addTodo({
          id: uuid(),
          title: title,
          completed: false
        })
      );
      setTitle("")
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (title && title !== "") {
        dispatch(
          addTodo({
            id: uuid(),
            title: title,
            completed: false
          })
        );
        setTitle("")
      }
    }
  }
  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <input
          type="text"
          placeholder="Add your todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className={styles.todoActions}>
          {showAdd && (
            <div
              className={styles.icon}
              onClick={(e) => handleAdd(e)}
              onKeyDown={(e) => handleAdd(e)}
              tabIndex={0}
              role="button"
              
            >
              <FiPlus />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default TodoAdd;
