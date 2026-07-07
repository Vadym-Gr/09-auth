'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const normalizedTag = tag === 'All' ? '' : tag;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', normalizedTag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag: normalizedTag,
      }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  const hasNotes = notes.length > 0;

  return (
    <main className={css.mainContent}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}

      {isError && <p>Something went wrong.</p>}

      {hasNotes && <NoteList notes={notes} />}

      {hasNotes && totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </main>
  );
}