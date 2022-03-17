import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import styles from '../styles/modules/todoItem.module.scss';
import CheckButton from './CheckButton';
import { getClasses } from '../utils/getClasses';

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

function TodoItem() {
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(!checked);
        // dispatch(
        //   updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
        // );
      };
    
      const handleDelete = () => {
        // dispatch(deleteTodo(todo.id));
        // toast.success('Todo Deleted Successfully');
      };
    
      const handleUpdate = () => {
        // setUpdateModalOpen(true);
      };
  return (
    <>
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
              {/* {todo.title} */}test
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
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default TodoItem