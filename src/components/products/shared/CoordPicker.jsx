'use client';
import { useState } from 'react';

// Dev-only overlay for reading a model's local-space hotspot coordinates by
// clicking on it. Every call site gates this behind its own PICK_COORDS flag
// (rotate the model, click a spot, copy the printed value, flip the flag back
// to false before committing) — it never renders in production.
export default function CoordPicker({ title, hotspotIds, picked, onClear, draggable = false }) {
  const [pos, setPos] = useState({ x: 12, y: 12 });

  function handleDragStart(e) {
    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;
    function onMove(ev) { setPos({ x: ev.clientX - startX, y: ev.clientY - startY }); }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  return (
    <div
      onMouseDown={draggable ? handleDragStart : undefined}
      style={{
        position: 'absolute', top: pos.y, left: pos.x, zIndex: 9999,
        background: 'rgba(0,0,0,0.82)', color: '#fff',
        padding: '14px 16px', fontFamily: 'monospace', fontSize: 12,
        lineHeight: 1.7, borderRadius: 6, maxWidth: 360, pointerEvents: 'auto',
        cursor: draggable ? 'grab' : 'default', userSelect: draggable ? 'none' : 'auto',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6, color: '#F43D00' }}>
        {title} — click the model ({picked.length}/{hotspotIds.length} picked)
      </div>
      {hotspotIds.map((id, i) => {
        const c = picked[i];
        return (
          <div key={id} style={{ color: c ? '#7effa0' : '#888' }}>
            {`'${id}': `}
            {c ? `[${c[0]}, ${c[1]}, ${c[2]}],` : '— not yet picked'}
          </div>
        );
      })}
      {picked.length > 0 && (
        <button
          onClick={onClear}
          style={{
            marginTop: 10, background: '#333', color: '#fff', border: '1px solid #555',
            padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11,
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
