import React from 'react'
import { useSelector } from 'react-redux';
import TodoAdd from './TodoAdd';
import TodoItem from './TodoItem'


function AppContent() {
  const {todoList} = useSelector((state) => state.todo);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const filteredTodoList = todoList?.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    else if (filterStatus === "Done") {
      return item.completed === true;
    } else {
      return item.completed === false;
    }
  });
  
  return (
    <>
    {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <h2 >
            No Todos
          </h2>
        )}
    <TodoAdd/>
    </>
  )
}

export default AppContent