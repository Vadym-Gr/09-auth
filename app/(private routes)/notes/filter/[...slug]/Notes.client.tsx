'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Note } from '@/types/note';

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag: tag === 'all' ? undefined : tag,
      }),
  });

  const notes = data?.notes ?? [];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div>
      <SearchBox onSearch={setSearch} />

      <button onClick={openModal}>Create note</button>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found</p>
      )}

      <Pagination
        currentPage={page}
        pageCount={data?.totalPages ?? 1} // ✅ FIX
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />

      {isModalOpen && (
        <Modal onClose={closeModal}> 
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

/*'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient({ tag }: { tag?: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, page, search],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag: tag === 'all' ? undefined : tag,
      }),
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <SearchBox onSearch={setSearch} />

      <button onClick={openModal}>Create note</button>

      {data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      <Pagination
        pageCount={data?.totalPages || 1}
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />

      {isModalOpen && (
        <Modal>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}*/