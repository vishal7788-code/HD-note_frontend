import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note{
    _id:string;
    userId:string;
    Title:string;
    Content:string;
    createdAt:string;
    updatedAt:string;

}

interface NoteState {
    notes: Note[];
  }
  
  const initialState: NoteState = {
    notes: [],
  };
  const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
        state.notes = action.payload;}
  }})

  export const { setNotes } = notesSlice.actions;
  export default notesSlice.reducer;