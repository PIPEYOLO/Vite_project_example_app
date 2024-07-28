import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const peopleAdapter = createEntityAdapter({
  selectId: person => person.id,
});

const initialState = peopleAdapter.getInitialState();

const peopleSlice = createSlice({
  name: "people",
  reducerPath: "people",
  initialState: initialState,
  reducers: {
    removePerson: (state, action) => {
      peopleAdapter.removeOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPeople.fulfilled, 
      (state, action) => {
        const people = action.payload;
        console.log(people);
        peopleAdapter.addMany(state, people);
      }
    )
  }
})


// Thunk actions
export const fetchPeople = createAsyncThunk(
  `${peopleSlice.reducerPath}`,
  async (_, { rejectWithValue }) => {
    let result
    
    try {
      result = await (await fetch(`/api/people`)).json();
    } 
    catch(error) {
      return rejectWithValue(error.error);
    }

    return result.data;
  }
);

// Actions

export const { removePerson } = peopleSlice.actions;



export default peopleSlice.reducer;