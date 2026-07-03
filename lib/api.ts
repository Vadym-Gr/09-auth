import axios from 'axios';
import { Note } from '@/types/note';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // ✅ тут
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`, // ✅ тут
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params,
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  note: Omit<Note, 'id'>
): Promise<Note> => {
  const res = await api.post<Note>('/notes', note);
  return res.data;
};

// ✅ FIX: must return deleted note
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};
