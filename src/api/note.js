import {
	collection,
	query,
	orderBy,
	getDocs,
	updateDoc,
	addDoc,
	deleteDoc,
	doc,
	onSnapshot,
	QuerySnapshot,
} from "firebase/firestore";
import { FirebaseApp } from "utils/firebase";

export class NoteAPI {
	static async create(formValues) {
		const response = await addDoc(collection(FirebaseApp.db, "notes"), {
			formValues,
		});
		return {
			id: response.id,
			...formValues,
		};
	}

	static async fetchAll() {
		const q = query(
			collection(FirebaseApp.db, "notes"),
			orderBy("created_at", "asc")
		);
		const response = await getDocs(q);
		const parseDMY = (dateString) => {
			let [d, m, y] = dateString.split("/");
			return new Date(y, m - 1, d);
		};
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
		deleteDoc(doc(FirebaseApp.db, "notes", noteId));
	}
	static async updateById(id, values) {
		const query = doc(FirebaseApp.db, "notes", id);
		const response = await updateDoc(query, { values });
		return {
			id,
			...values,
		};
	}

	static onShouldSyncNotes(onChange) {
		const q = query(collection(FirebaseApp.db, "notes"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;

			!isUserPerformingChange && onChange();
		});
		return unsub;
	}
}
