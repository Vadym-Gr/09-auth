'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { Note } from '@/types/note';

interface Props {
  id: string;
}

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    
    <Modal onClose={handleClose}>
      <button onClick={handleClose}>Close</button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading note</p>}

      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>{data.tag}</p>
          <p>{data.createdAt}</p>
        </div>
      )}
    </Modal>
  );
}