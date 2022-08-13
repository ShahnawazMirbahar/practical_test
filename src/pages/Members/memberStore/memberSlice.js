import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
export const singleMemberAsync = createAsyncThunk(
  `member/singleMemberAsync`,
  async (payload) => {
    console.log("payload", payload);

    const response = await fetch(`http://localhost:8000/members/${payload}`);
    // const response = await instance.post(`${getOauthTokenRoute}`, fd);
    // const data = response;
    const data = await response.json();
    console.log("data", data);
    return data;
    // return data;
  }
);

export const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: null,
    singleMember: null,
    loading: false,
  },
  reducers: {
    // Reducer comes here
    setEditMembersDetails(state, action) {
      console.log("setEditMembersDetails called", action.payload);
      return {
        ...state,
        singleMember: null,
      };
    },
  },
  extraReducers: {
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

    [singleMemberAsync.pending]: (state) => {
      state.loading = true;
    },
    [singleMemberAsync.fulfilled]: (state, action) => {
      console.log("action", action);
      state.loading = false;
      state.singleMember = action.payload;
    },
    [singleMemberAsync.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setEditMembersDetails } = memberSlice.actions;

export default memberSlice.reducer;
