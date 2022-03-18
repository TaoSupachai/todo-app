import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import styles from '../styles/modules/todoItem.module.scss';
import CheckButton from './CheckButton';
import { getClasses } from '../utils/getClasses';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(todo.completed);
  const [showEdit, setShowEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(todo.title);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, completed: checked ? false : true })
    );
  };

  const handleSave = () => {
    setShowEdit(!showEdit);
    dispatch(
      updateTodo({ ...todo, title: titleEdit })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setShowEdit(!showEdit);
      dispatch(
        updateTodo({ ...todo, title: titleEdit })
      );
    }
  }



  const handleUpdate = () => {
    setShowEdit(true);
  };
  return (
    <>
      {!showEdit ?
        <motion.div className={styles.item} variants={child}>
          <div className={styles.todoDetails}>
            <CheckButton checked={checked} handleCheck={handleCheck} />
            <div className={styles.texts}>
              <p
                className={getClasses([
                  styles.todoText,
                  checked === true && styles['todoText--completed'],
                ])}
              >
                {todo.title}
              </p>
            </div>
          </div>
          <div className={styles.todoActions}>
            <div
              className={styles.icon}
              onClick={() => handleDelete()}
              onKeyDown={() => handleDelete()}
              tabIndex={0}
              role="button"
            >
              <MdDelete />
            </div>
            <div
              className={styles.icon}
              onClick={(e) => handleUpdate(e)}
              onKeyDown={(e) => handleUpdate(e)}
              tabIndex={0}
              role="button"
            >
              <MdEdit />
            </div>
          </div>
        </motion.div>
        :
        <motion.div className={styles.item} variants={child}>
          <div className={styles.todoDetails}>
            <input
              type="text"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          <div className={styles.todoActions}>
            <div
              className={styles.icon}
              onClick={() => handleSave()}
              onKeyDown={() => handleSave()}
              tabIndex={0}
              role="button"
            >
              save
            </div>
          </div>
        </motion.div>
      }
    </>
  )
}

export default TodoItem