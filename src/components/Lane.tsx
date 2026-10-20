// Gameplay-lane pieces, laid out after OurTaikoPlay's play screen but redrawn from
// scratch (OurTaikoPlay's own sprites come from a skin that recreates official game
// art, which the Taiko fan-content policy doesn't let us redistribute).
const INK = '#1A1A1A'

export type NoteKind = 'don' | 'ka'

/** A face note: colored disc, thick white rim, dark outline. */
export function FaceNote({ kind, size }: { kind: NoteKind; size: number }) {
  const fill = kind === 'don' ? '#F2542D' : '#45B8D4'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill={INK} />
      <circle cx="50" cy="50" r="42" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="33" fill={fill} stroke={INK} strokeWidth="2.5" />
      <ellipse cx="38" cy="45" rx="3.6" ry="5" fill={INK} />
      <ellipse cx="62" cy="45" rx="3.6" ry="5" fill={INK} />
      <ellipse cx="30" cy="55" rx="5" ry="3" fill="#FFB3BE" opacity=".9" />
      <ellipse cx="70" cy="55" rx="5" ry="3" fill="#FFB3BE" opacity=".9" />
      <path d="M41 56 Q50 67 59 56 Z" fill="#8E1B12" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

/** The player's drum, front view. `hit` lights the face (don) or the rim (ka) on the left side. */
export function Drum({ hit, size = 92 }: { hit: NoteKind | null; size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" aria-hidden="true">
      {/* shell */}
      <path d="M8 50 L8 78 Q50 104 92 78 L92 50 Z" fill="#C8341E" stroke={INK} strokeWidth="3" />
      <path d="M8 64 Q50 90 92 64" fill="none" stroke="#7A1A0E" strokeWidth="3" />
      {[18, 34, 50, 66, 82].map((x) => <circle key={x} cx={x} cy={x === 50 ? 88 : x === 34 || x === 66 ? 85 : 79} r="2.4" fill="#F4C430" stroke={INK} strokeWidth="1" />)}
      {/* head: rim + face */}
      <ellipse cx="50" cy="48" rx="44" ry="38" fill="#2A2A2A" stroke={INK} strokeWidth="3" />
      {hit === 'ka' && <path d="M50 10 A44 38 0 0 0 50 86 L50 79 A36 31 0 0 1 50 17 Z" fill="#45B8D4" />}
      <ellipse cx="50" cy="48" rx="36" ry="31" fill="#F7EFE2" stroke={INK} strokeWidth="2.5" />
      {hit === 'don' && <path d="M50 17 A36 31 0 0 0 50 79 Z" fill="#F2542D" />}
      <ellipse cx="50" cy="48" rx="36" ry="31" fill="none" stroke={INK} strokeWidth="2.5" />
      <line x1="50" y1="17" x2="50" y2="79" stroke={INK} strokeWidth="1.5" strokeDasharray="3 4" opacity=".35" />
    </svg>
  )
}
