import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { noteSlice } from "store/notes/notes-slice";

export function Note(props) {
	const { noteId } = useParams();
	const note = useSelector((store) =>
		store.noteSlice.noteList.find((note) => note.id === noteId)
	);
	console.log("***", note);
	return <> Note </>;
}
