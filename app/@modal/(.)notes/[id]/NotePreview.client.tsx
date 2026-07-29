'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { fetchNoteById } from '../../../../lib/api';
import Modal from '../../../../components/Modal/Modal';

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient: React.FC<NotePreviewClientProps> = ({ id }) => {
  const router = useRouter();
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Modal onClose={() => router.back()}><p>Loading...</p></Modal>;
  if (isError || !note) return <Modal onClose={() => router.back()}><p>Error loading note.</p></Modal>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
