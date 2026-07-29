import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage({ params }: { params: { slug: string[] } }) {
  const queryClient = new QueryClient();
  const slug = params.slug || [];
  const rawTag = slug[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
