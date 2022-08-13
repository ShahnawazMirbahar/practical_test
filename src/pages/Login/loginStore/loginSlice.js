import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  `login/loginAsync`,
  async (payload) => {
    console.log("payload", payload);

    const response = await fetch(
      `http://localhost:8000/login?email=${payload.email}&password=${payload.password}`
    );
    // const response = await instance.post(`${getOauthTokenRoute}`, fd);
    // const data = response;
    const data = await response.json();
    console.log("data", data);
    return data;
    // return data;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    email: "",
    data: null,
    loading: false,
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: {
    [loginAsync.pending]: (state) => {
      state.loading = true;
    },
    [loginAsync.fulfilled]: (state, action) => {
      console.log("action", action);
      state.loading = false;
      state.data = action.payload;
    },
    [loginAsync.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default loginSlice.reducer;
