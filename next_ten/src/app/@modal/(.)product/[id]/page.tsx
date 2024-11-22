'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { itemList } from '../../../page';

function ItemModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const item = itemList.find((e) => e.id === +params.id);

  const handleClose = () => {
    router.back(); // Closes modal and returns to main page
  };

  return (
    <Dialog open onOpenChange={() => handleClose()}>
      <DialogContent className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg">
        <DialogHeader>
          <h1>Intercepting Routes</h1>
        </DialogHeader>
        <h1>{item?.id}</h1>
        <p>{item?.value}</p>
        <button onClick={handleClose} className="text-gray-500 hover:text-black mt-4">
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default ItemModal;
