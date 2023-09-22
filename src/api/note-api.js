import axios from "axios";

const BASE_URL = "http://[::1]:3200/notes";
const parseDMY = (dateString) => {
	let [d, m, y] = dateString.split("/");
	return new Date(y, m - 1, d);
};

export class NoteAPI {
	static async create(formValues) {
		return this.formatId((await axios.post(`${BASE_URL}`, formValues)).data);
	}
	static async fetchAll() {
		const q = query(
			collection(FirebaseApp.db, "notes"),
			orderBy("created_at", "asc")
		);
		const response = await getDocs(q);
		return response.docs
			.map((document) => {
				return {
					id: document.id,
					...document.data(),
				};
			})
			.sort((a, b) => {
				return parseDMY(a.created_at) > parseDMY(b.created_at);
			});
	}

	static async deleteById(noteId) {
		return (await axios.delete(`${BASE_URL}/${noteId}`)).data;
	}
	static async updateById(id, values) {
		return this.formatId((await axios.patch(`${BASE_URL}/${id}`, values)).data);
	}
	static async fetchById(noteId) {
		return this.formatId((await axios.get(`${BASE_URL}/${noteId}`)).data);
	}
	static formatId(note) {
		return {
			...note,
			id: note.id.toString(),
		};
	}
}
