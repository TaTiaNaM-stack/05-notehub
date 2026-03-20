import axios from 'axios';
import type { CreateNoteData, FetchNotesResponse, Note } from '../types/note';
const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${VITE_NOTEHUB_TOKEN}`;

interface FetchNotesOptions {
  page?: number;
  perPage?: number;
}

export const fetchNotes = async (options: FetchNotesOptions = {}): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>('/notes', {
      params: {
        page: options.page || 1,
        perPage: options.perPage || 12,
      },
    });
    

  
    return response.data;
}

export const createNote = async (newTodo: CreateNoteData) => {
    const response = await axios.post<Note>('/notes', newTodo);
    return response.data;
}

// export const deleteNote = async (id: string): Promise<void> => {
//     await axios.delete(`/notes/${id}`);
// }