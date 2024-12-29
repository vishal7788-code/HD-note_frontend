import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Note interface
export interface Note {
  _id: string;
  userId: string;
  Title: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
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
    // Set notes state
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    // Add a new note
        addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    // Delete a note
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note._id !== action.payload);
    }
  },
});

export const { setNotes, addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
