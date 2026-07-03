'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../lib/api';

export default function NotePreview({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data && ( // ✅ FIX: перевірка на undefined
        <>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        </>
      )}
    </div>
  );
}