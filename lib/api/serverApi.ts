import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
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
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
}

export async function checkSession(): Promise<boolean> {
  const { data } = await api.get<User | null>('/auth/session', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return Boolean(data);
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return data;
}