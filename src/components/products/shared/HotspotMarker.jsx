'use client';
import { Html } from '@react-three/drei';

// Renders one hotspot's invisible hit-zone plus its sliding nameplate. The
// visible radar-ping dot itself is drawn separately by the shared
// instancedMesh in the parent scene — this only handles the label + hit area.
export default function HotspotMarker({ hotspot, isNameplateVisible, hitRef, labelRef, onHoverStart, onHoverEnd, onSelect }) {
  return (
    <Html position={hotspot.position} center zIndexRange={[100, 0]}>
      <div style={{ position: 'relative' }}>
        <div
          ref={hitRef}
          style={{
            position:      'absolute',
            width:         '30px',
            height:        '30px',
            left:          '-15px',
            top:           '-15px',
            cursor:        'pointer',
            pointerEvents: 'none',
          }}
          onMouseEnter={() => { onHoverStart(hotspot.id); document.body.style.cursor = 'pointer'; }}
          onMouseLeave={() => { onHoverEnd(); document.body.style.cursor = 'auto'; }}
          onClick={() => onSelect(hotspot.id)}
        />
        <div ref={labelRef} style={{ position: 'relative', pointerEvents: 'none', opacity: 0 }}>
          <div style={{
            position:        'absolute',
            left:            '22px',
            top:             '0px',
            transform:       `translateY(-50%) translateX(${isNameplateVisible ? '0px' : '-8px'})`,
            backgroundColor: '#F43D00',
            color:           '#FFFFFF',
            height:          '38px',
            padding:         '0 16px',
            display:         'flex',
            alignItems:      'center',
            whiteSpace:      'nowrap',
            fontFamily:      'inherit',
            fontSize:        '12px',
            fontWeight:      500,
            letterSpacing:   '1.2px',
            boxShadow:       '0 4px 12px rgba(244,61,0,0.2)',
            pointerEvents:   'none',
            opacity:         isNameplateVisible ? 1 : 0,
            visibility:      isNameplateVisible ? 'visible' : 'hidden',
            transition:      'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1), visibility 0.2s ease',
          }}>
            <span>{hotspot.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px' }}>
              <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <line x1="0"  y1="8"  x2="6"  y2="8"  stroke="currentColor" strokeWidth="1.5" />
                <line x1="10" y1="8"  x2="16" y2="8"  stroke="currentColor" strokeWidth="1.5" />
                <line x1="8"  y1="0"  x2="8"  y2="6"  stroke="currentColor" strokeWidth="1.5" />
                <line x1="8"  y1="10" x2="8"  y2="16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
