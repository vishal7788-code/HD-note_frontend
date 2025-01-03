import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../redux/notesSlice";
import { RootState } from "../redux/store";

const CreateNote: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);

  if (!user) return null;

  const userId = user.userId;

  const togglePopover = () => setIsOpen((prev) => !prev);

  const saveNote = async () => {
    if (!title || !content) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError(null);
// create note api call
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_NOTE_API_ENDPOINT}/createnote`,
        { Title: title, Content: content, userId },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setContent("");

        // Fetch updated notes from api
        const updatedNotes = await axios.get(
          `${import.meta.env.VITE_NOTE_API_ENDPOINT}/allnotes/${userId}`,
          { withCredentials: true }
        );

        if (updatedNotes.data.success) {
          dispatch(setNotes(updatedNotes.data.notes));
        } else {
          toast.error("Failed to update notes.");
        }

        setIsOpen(false);
      } else {
        setError("Failed to save note.");
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative my-5 w-full">
      <button
        onClick={togglePopover}
        className="bg-blue-700 w-[92%] mx-2 md:mx-16 md:w-[84%] lg:w-[82%] lg:mx-[4rem] text-white font-semibold py-2 px-4 rounded-lg"
        aria-label="Create Note"
      >
        Create Note
      </button>

      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 z-40" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-8 rounded-xl max-w-full sm:max-w-3xl w-full z-50">
            <h2 className="text-2xl font-semibold mb-4">Create a Note</h2>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Note Title"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Note Content"
                rows={6}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={togglePopover}
                className="text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition ease-in duration-300 w-full sm:w-auto"
              >
                Close
              </button>
              <button
                onClick={saveNote}
                className={`bg-blue-700 text-white py-2 px-4 rounded-lg transition ease-in duration-300 hover:bg-blue-800 w-full sm:w-auto ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Save Note"}
              </button>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateNote;
