import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../config/API";

const initialState = {
  filterStatus: "all",
  todoList: null,
  loading: false,
  error: "",
};

export const getTodoAsync = createAsyncThunk("getTodo", async (filter) => {
  try {
    if (filter) {
      if (filter === "Done") {
        const { data } = await API.get("todos?completed=true");
        return data;
      } else if (filter === "Undone") {
        const { data } = await API.get("todos?completed=false");
        return data;
      } else {
        const { data } = await API.get("todos");
        return data;
      }
      
    } else {
      const { data } = await API.get("todos");
      return data;
    }

  } catch (error) {
    throw error;
  }
});

export const addTodo = createAsyncThunk('addTodo', async (todo, { dispatch, getState }) => {

  const response = await API.post('todos', todo)
  await dispatch(getTodoAsync())
  return response.data
})

export const updateTodo = createAsyncThunk('updateTodo', async (todo, { dispatch, getState }) => {
  const response = await API.put(`todos/${todo.id}`, { title: todo.title, completed: todo.completed })
  await dispatch(getTodoAsync())
  return response.data
})

export const deleteTodo = createAsyncThunk('deleteTodo', async (todoId, { dispatch, getState }) => {
  const response = await API.delete(`todos/${todoId}`)
  await dispatch(getTodoAsync())
  return response.data
})

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.todoList = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.todoList = null;
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
