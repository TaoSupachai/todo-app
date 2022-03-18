import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/modules/app.module.scss";
import SelectButton from "./SelectButton";
import { updateFilterStatus } from '../slices/todoSlice';

function AppHeader() {
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <p className={styles.appTitle}>Task</p>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="Done">Done</option>
        <option value="Undone">Undone</option>
      </SelectButton>
    </div>
  );
}

export default AppHeader;
