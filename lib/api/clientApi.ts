import { api } from './api';
import type { Note } from '@/types/note';

// Local alias for creating a new note. Use Partial<Note> to avoid
// depending on a non-exported type from the shared types file.
type NewNoteData = Partial<Note>;
import type { User } from '@/types/user';

interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateMeData {
  username: string;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  search = '',
  page = 1,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search && { search }),
      ...(tag && tag !== 'All' && { tag }),
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: NewNoteData): Promise<Note> {
  const { data } = await api.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function register(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post<User>('/auth/register', credentials);
  return data;
}

export async function login(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post<User>('/auth/login', credentials);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<boolean> {
  const { data } = await api.get<User | null>('/auth/session');
  return Boolean(data);
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function updateMe(user: UpdateMeData): Promise<User> {
  const { data } = await api.patch<User>('/users/me', user);
  return data;
}