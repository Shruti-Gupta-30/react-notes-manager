import { NoteAPI } from "api/note";
import { useDispatch } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "store/notes/notes-slice";

export function NoteList({ noteList }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	async function deleteNote_(note) {
		if (window.confirm("Delete Note?")) {
			NoteAPI.deleteById(note.id);
			dispatch(deleteNote(note));
		}
	}

	return (
		<div className={`row justify-content-center ${s.cards_container}`}>
			{noteList.map((note) => (
				<div key={note.id} className={s.card_container}>
					<TextCard
						title={note.title}
						subtitle={note.created_at}
						content={note.content}
						onClick={() => navigate("/note/" + note.id)}
						onClickTrash={() => deleteNote_(note)}
					/>
				</div>
			))}
		</div>
	);
}
