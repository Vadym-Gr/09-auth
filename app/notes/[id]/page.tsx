/*import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}*/

import { fetchNoteById } from '../../../lib/api';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}