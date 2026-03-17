import axios from 'axios';
import type { Note } from '../types/note';
const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${VITE_NOTEHUB_TOKEN}`;

export const getNotes = async (): Promise<Note[]> => {
    const response = await axios.get<Note[]>('/notes'){
        params: {
            page: page?,
           perPage: 10,
        }
    };
    return response.data;
}