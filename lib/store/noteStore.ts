import { create } from 'zustand';
import type { NoteTag } from '@/types/note';

interface NoteStore {
  tag: NoteTag | 'All';
  setTag: (tag: NoteTag | 'All') => void;
}

export const useNoteStore = create<NoteStore>()((set) => ({
  tag: 'All',
  setTag: (tag) => set({ tag }),
}));