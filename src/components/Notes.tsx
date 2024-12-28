import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setNotes } from "../redux/notesSlice";
import axios from "axios";
import { Note } from "../redux/notesSlice";
import { toast } from "react-toastify";

interface NotesProps {
  notes: Note[]; 
}
const Notes: React.FC<NotesProps> = ({ notes }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const dispatch = useDispatch();
  const handleTitleClick = (note: Note) => {
    setSelectedNote(note);
  };
  // Function to delete a note
  const deleteNote = async (noteId: string) => {
    try {
      if (!noteId) {
        throw new Error("Invalid note ID");
      }
      // Call the delete API
      const res = await axios.delete(
        `${import.meta.env.VITE_NOTE_API_ENDPOINT}/deletenote/${noteId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedNotes = notes.filter((note) => note._id !== noteId);
        dispatch(setNotes(updatedNotes));
        toast.success(res.data.success);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the note.");
    }
  };
  
  return (
    <div className="p-4">
      {/* List of Note Titles */}
      <div className="space-y-4 w-full">
        {notes && notes.length > 0 ? (
          notes.map((note: Note) => {
            // Check if the note is defined before accessing its properties
            if (!note || !note.Title) return null;

            return (
              <div
                key={note._id}
                className="cursor-pointer lg:max-w-3xl shadow-lg shadow-gray-300 rounded-lg text-lg font-semibold mx-auto sm:mx-9 p-3 hover:text-blue-700 flex justify-between items-center flex-row sm:flex-row"
              >
                <h3
                  onClick={() => handleTitleClick(note)}
                  className="w-full sm:w-auto sm:text-left mb-2 sm:mb-0"
                >
                  {note.Title}
                </h3>

                {/* Delete Button */}
                <button
                  onClick={() => deleteNote(note._id)}
                  aria-label="delete note"
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <BiTrash className="h-5 w-5" />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 font-semibold">No notes available. Please create some notes.</p>
        )}
      </div>

      {/* Popover for the selected note */}
      {selectedNote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] sm:w-[80%] max-w-3xl p-6 shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-md text-gray-300 hover:text-gray-500"
              onClick={() => setSelectedNote(null)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold">Title : {selectedNote.Title}</h2>
            <p className="mt-4"> Content : {selectedNote.Content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
