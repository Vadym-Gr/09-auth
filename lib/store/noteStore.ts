import { create } from 'zustand';
import type { NoteTag } from '@/types/note';

interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  tag: NoteTag | 'All';
  draft: NoteDraft;
  setTag: (tag: NoteTag | 'All') => void;
  setDraft: (draft: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()((set) => ({
  tag: 'All',
  draft: initialDraft,

  setTag: (tag) => set({ tag }),

  setDraft: (draft) =>
    set((state) => ({
      draft: {
        ...state.draft,
        ...draft,
      },
    })),

  clearDraft: () => set({ draft: initialDraft }),
}));