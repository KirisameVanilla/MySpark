// Gameplay-lane sprites from OurTaikoPlay (public/lane/, see README credits).
export type NoteKind = 'don' | 'ka'

/** A note sprite; `big` uses the 大音符 art. Sprites sit centered in a 192px canvas. */
export function FaceNote({ kind, big }: { kind: NoteKind; big: boolean }) {
  return <img className="sprite" src={`/lane/note_${kind}${big ? '_big' : ''}.png`} alt="" />
}

/** The player's drum; `hit` overlays the left face (don) or left rim (ka) highlight. */
export function Drum({ hit }: { hit: NoteKind | null }) {
  return (
    <span className="drum" aria-hidden="true">
      <img src="/lane/drum.png" alt="" />
      {hit === 'don' && <img src="/lane/drum_don_l.png" alt="" />}
      {hit === 'ka' && <img src="/lane/drum_kat_l.png" alt="" />}
    </span>
  )
}
