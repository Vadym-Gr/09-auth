import axios from 'axios';
import { Note } from '@/types/note';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page: params.page,
      search: params.search,
      tag: params.tag,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const res = await api.post<Note>('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
