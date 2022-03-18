import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import TodoProgress from "./components/TodoProgress";
import {getTodoAsync} from './slices/todoSlice'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodoAsync())
  }, []);

  return (
    <div className="container">
      <TodoProgress />
      <AppHeader />
      <AppContent />
    </div>
  );
}

export default App;
