'use client';

import { useEffect } from 'react';
import { getLenis } from '@/lib/lenis';

// Ensures Lenis is created even on pages with no scroll-driven pin hooks
// (which would otherwise only construct it lazily on first subscribe).
export default function LenisProvider() {
  useEffect(() => {
    getLenis();
  }, []);

  return null;
}
