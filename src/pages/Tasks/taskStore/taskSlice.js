import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const taskAsync = createAsyncThunk(`task/taskAsync`, async (payload) => {
  console.log("payload", payload);

  const response = await fetch(`http://localhost:8000/tasks`);
  // const response = await instance.post(`${getOauthTokenRoute}`, fd);
  // const data = response;
  const data = await response.json();
  console.log("data", data);
  return data;
  // return data;
});
export const memberAsync = createAsyncThunk(
  `task/memberAsync`,
  async (payload) => {
    console.log("payload", payload);

    const response = await fetch(`http://localhost:8000/members`);
    // const response = await instance.post(`${getOauthTokenRoute}`, fd);
    // const data = response;
    const data = await response.json();
    console.log("data", data);
    return data;
    // return data;
  }
);

export const singleTaskAsync = createAsyncThunk(
  `task/singleTaskAsync`,
  async (payload) => {
    console.log("payload", payload);

    const response = await fetch(`http://localhost:8000/tasks/${payload}`);
    // const response = await instance.post(`${getOauthTokenRoute}`, fd);
    // const data = response;
    const data = await response.json();
    console.log("data", data);
    return data;
    // return data;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: null,
    members: null,
    singleTask: null,
    loading: false,
  },
  reducers: {
    // Reducer comes here
    setEditTaskDetails(state, action) {
      console.log("setEditTaskDetails called", action.payload);
      return {
        ...state,
        singleTask: null,
      };
    },
  },
  extraReducers: {
    [taskAsync.pending]: (state) => {
      state.loading = true;
    },
    [taskAsync.fulfilled]: (state, action) => {
      console.log("action", action);
      state.loading = false;
      state.data = action.payload;
    },
    [taskAsync.rejected]: (state) => {
      state.loading = false;
    },
    [memberAsync.pending]: (state) => {
      state.loading = true;
    },
    [memberAsync.fulfilled]: (state, action) => {
      console.log("action", action);
      state.loading = false;
      state.members = action.payload;
    },
    [memberAsync.rejected]: (state) => {
      state.loading = false;
    },
    [singleTaskAsync.pending]: (state) => {
      state.loading = true;
    },
    [singleTaskAsync.fulfilled]: (state, action) => {
      console.log("action", action);
      state.loading = false;
      state.singleTask = action.payload;
    },
    [singleTaskAsync.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setEditTaskDetails } = taskSlice.actions;

export default taskSlice.reducer;
