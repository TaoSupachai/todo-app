import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../config/API";

// const getInitialTodo = () => {
//   // getting todo list
//   const localTodoList = window.localStorage.getItem('todoList');
//   // if todo list is not empty
//   if (localTodoList) {
//     return JSON.parse(localTodoList);
//   }
//   window.localStorage.setItem('todoList', []);
//   return [];
// };

// const initialValue = {
//   filterStatus: 'all',
//   todoList: getInitialTodo(),
// };
const initialState = {
  filterStatus: "all",
  todoList: null,
  loading: false,
  error: "",
};

export const getTodoAsync = createAsyncThunk("getTodo", async (thunkAPI) => {
  try {
    const { data } = await API.get("todos");
    return data;
  } catch (error) {
    throw error;
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log("addTodo", action.payload);
      try {
        // API.post("todos", action.payload).then();
        API.post("todos", action.payload)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        // return [...state.todoList, ...action.payload];
      } catch (error) {
        return error;
      }

      // state.todoList.push(action.payload);
      // const todoList = window.localStorage.getItem("todoList");
      // if (todoList) {
      //   const todoListArr = JSON.parse(todoList);
      //   todoListArr.push({
      //     ...action.payload,
      //   });
      //   window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      // } else {
      //   window.localStorage.setItem(
      //     "todoList",
      //     JSON.stringify([
      //       {
      //         ...action.payload,
      //       },
      //     ])
      //   );
      // }
    },
    updateTodo: (state, action) => {
      console.log("updateTodo", state);

      // const todoList = window.localStorage.getItem("todoList");
      // if (todoList) {
      //   const todoListArr = JSON.parse(todoList);
      //   todoListArr.forEach((todo) => {
      //     if (todo.id === action.payload.id) {
      //       todo.status = action.payload.status;
      //       todo.title = action.payload.title;
      //     }
      //   });
      //   window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      //   state.todoList = [...todoListArr];
      // }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
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

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
