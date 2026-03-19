import axios from 'axios';
import type { Note } from '../types/note';
const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${VITE_NOTEHUB_TOKEN}`;

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await axios.get<Note[]>('/notes');   
    return response.data;
}

// export const createNote = async (noteData: Omit<Note, 'id'>): Promise<Note> => {
//     const response = await axios.post<Note>('/notes', noteData);
//     return response.data;
// }

// export const deleteNote = async (id: string): Promise<void> => {
//     await axios.delete(`/notes/${id}`);
// }