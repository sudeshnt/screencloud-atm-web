'use client';

import Machine from '@/components/Machine';
import SuccessScreen from '@/components/Screens/SuccessScreen';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function SuccessPage() {
  const params = useSearchParams();

  const withdrawAmount = params.get('withdrawAmount');
  const notes = params.get('notes');

  const notesObject: Record<string, string> | null = useMemo(() => {
    if (notes) {
      try {
        return JSON.parse(notes);
      } catch (err) {
        return null;
      }
    }
    return null;
  }, [notes]);

  return (
    <section className='page'>
      <Machine
        screen={<SuccessScreen withdrawAmount={withdrawAmount} notes={notesObject} />}
      />
    </section>
  );
}
