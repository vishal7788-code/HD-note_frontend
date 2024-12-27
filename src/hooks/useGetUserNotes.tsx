import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../redux/notesSlice";
import { RootState } from "../redux/store"; // Ensure the correct path

const useGetUserNotes = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.userId) {
      console.error("No user ID available. Skipping API call.");
      return;
    }

    const getUserNotes = async () => {
      console.log("Fetching notes for user ID:", user.userId);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_NOTE_API_ENDPOINT}/allnotes/${user.userId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          const notes = res.data.notes;
          console.log("Fetched notes:", notes);
          dispatch(setNotes(notes));
        }
      } catch (err) {
        console.error("Error from getting notes:", err);
      }
    };

    getUserNotes();
  }, [user, dispatch]);
};

export default useGetUserNotes;
