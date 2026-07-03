'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteList.module.css';
import { deleteNote } from '../../lib/api';
import { Note } from '../../types/note';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.card}>
            <div className={css.header}>
              <h2 className={css.title}>{note.title}</h2>
            </div>

            <p className={css.content}>{note.content}</p>

            <p className={css.tag}>{note.tag}</p>

            <div className={css.actions}>
              
              <Link
                href={`/notes/${note.id}`}
                className={css.link}
              >
                View details
              </Link>

              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
