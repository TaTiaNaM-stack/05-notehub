import axios from 'axios';
import type { CreateNoteData, FetchNotesResponse, Note } from '../types/note';
const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${VITE_NOTEHUB_TOKEN}`;



export const fetchNotes = async (): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>('/notes');   
    return response.data;
}

export const createNote = async (newTodo: CreateNoteData) => {
    const response = await axios.post<Note>('/notes', newTodo);
    return response.data;
}

// export const deleteNote = async (id: string): Promise<void> => {
//     await axios.delete(`/notes/${id}`);
// }