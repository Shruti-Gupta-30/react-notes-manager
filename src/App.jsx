import { NoteAPI } from "api/note";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "./style.module.css";
import { withAuthRequired } from "hoc/withAuthRequired";

export function App() {
	const dispatch = useDispatch();

	async function fetchAllNotes() {
		const noteList = await NoteAPI.fetchAll();
		dispatch(setNoteList(noteList));
	}
	useEffect(() => {
		fetchAllNotes();
	}, []);

	return (
		<div>
			<Header />
			<div className={s.workspace}>
				<Outlet />
			</div>
		</div>
	);
}

export const ProtectedApp = withAuthRequired(App);
