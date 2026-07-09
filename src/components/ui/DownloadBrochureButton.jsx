'use client';

import { useState } from 'react';
import Button from './Button';
import BrochureModal from './BrochureModal';

export default function DownloadBrochureButton({ property1, size, className }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button property1={property1} size={size} className={className} icon="download" onClick={() => setOpen(true)}>
        Download Brochure
      </Button>
      <BrochureModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
