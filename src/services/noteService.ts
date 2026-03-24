import axios from 'axios';
import type { CreateNoteData, FetchNotesResponse, Note } from '../types/note';

const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${VITE_NOTEHUB_TOKEN}`;

export const fetchNotes = async (searchQuery: string, currentPage: number): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>('/notes', {
      params: {
        page: currentPage,
        perPage: 12,
        search: searchQuery,
      },
    }); 
    return response.data;
}

export const createNote = async (newTodo: CreateNoteData): Promise<Note> => {
    const response = await axios.post<Note>('/notes', newTodo);
    return response.data;
}

export const deleteNote = async (id: string): Promise<void> => {
    await axios.delete(`/notes/${id}`);
}