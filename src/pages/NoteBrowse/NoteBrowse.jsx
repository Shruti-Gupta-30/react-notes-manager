import { SearchBar } from "components/SearchBar/SearchBar";
import { NoteList } from "containers/NoteList/NoteList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function NoteBrowse(props) {
	const noteList = useSelector((store) => store.noteSlice.noteList);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredNoteList = noteList.filter((note) => {
		const containsTitle = note.title
			.trim()
			.toUpperCase()
			.includes(searchTerm.trim().toUpperCase());
		return containsTitle;
	});

	return (
		<>
			<div className="row justify-content-center mb-5">
				<div className="col sm-12 col-md-4">
					<SearchBar
						onTextChange={setSearchTerm}
						placeholder="Search by Title"
					/>
				</div>
			</div>
			{noteList?.length === 0 && (
				<div className="d-flex justify-content-center">
					<span>
						{" "}
						You haven't created any notes yet,{" "}
						<Link to="/note/new">Create one Now!</Link>
					</span>
				</div>
			)}
			<NoteList noteList={filteredNoteList} />
		</>
	);
}
