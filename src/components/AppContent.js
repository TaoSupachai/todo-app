import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import TodoAdd from './TodoAdd';
import TodoItem from './TodoItem'


function AppContent() {
  const {todoList} = useSelector((state) => state.todo);
  // const filterStatus = useSelector((state) => state.todo.filterStatus);

  // const filteredTodoList = todoList.filter((item) => {
  //   if (filterStatus === "all") {
  //     return true;
  //   }
  //   return item.status === filterStatus;
  // });
  useEffect(() => {
    console.log("todoList",todoList);
  }, [todoList])
  
  return (
    <>
    { todoList?.map(todo => <TodoItem key={todo.id} todo={todo} /> )

    }
    <TodoAdd/>
    </>
  )
}

export default AppContent