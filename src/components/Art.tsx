// Original fan-drawn motifs (not official art):
//  - Star, MagicCircle, Hakkero: Marisa's star bullets, magic circle and mini-hakkero
//  - SpiderLily, GlassShards: Phrolova's red spider lilies and shattered glass
import type { CSSProperties } from 'react'

const INK = '#1E1726'

export function Star({ size = 24, fill = '#F4C430', className, style }: {
  size?: number
  fill?: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" fill={fill} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function MagicCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="#F4C430">
        <circle cx="100" cy="100" r="97" strokeWidth="2" />
        <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="2 5" />
        <polygon points="100,12 176,144 24,144" strokeWidth="1.6" />
        <polygon points="100,188 24,56 176,56" strokeWidth="1.6" />
        <circle cx="100" cy="100" r="62" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function Hakkero({ size = 74 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 74 74" aria-hidden="true">
      <polygon points="22,4 52,4 70,22 70,52 52,70 22,70 4,52 4,22" fill={INK} />
      <polygon points="24,10 50,10 64,24 64,50 50,64 24,64 10,50 10,24" fill="#F4C430" stroke={INK} strokeWidth="2" />
      <circle cx="37" cy="37" r="12" fill="#FFF6EA" stroke={INK} strokeWidth="2.5" />
      <path d="M37 25 A12 12 0 0 1 37 49 A6 6 0 0 1 37 37 A6 6 0 0 0 37 25" fill={INK} />
    </svg>
  )
}

export function SpiderLily({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-60 -60 120 160" aria-hidden="true">
      <path d="M0 100 C 2 60, -2 30, 0 0" stroke="#3D6B3A" strokeWidth="3" fill="none" />
      <g fill="none" stroke="#D7263D" strokeWidth="4" strokeLinecap="round">
        <path d="M0 0 C 10 -14, 30 -22, 36 -10" /><path d="M0 0 C -10 -14, -30 -22, -36 -10" />
        <path d="M0 0 C 14 -2, 30 6, 30 18" /><path d="M0 0 C -14 -2, -30 6, -30 18" />
        <path d="M0 0 C 4 -16, 14 -34, 4 -40" /><path d="M0 0 C -4 -16, -14 -34, -4 -40" />
      </g>
      <g stroke="#FF6B7D" strokeWidth="1.4" fill="none">
        <path d="M0 0 C 18 -20, 40 -40, 52 -36" /><path d="M0 0 C -18 -20, -40 -40, -52 -36" />
        <path d="M0 0 C 8 -28, 20 -50, 26 -54" /><path d="M0 0 C -8 -28, -20 -50, -26 -54" />
      </g>
      <g fill="#FFB3BE">
        <circle cx="52" cy="-36" r="2.5" /><circle cx="-52" cy="-36" r="2.5" />
        <circle cx="26" cy="-54" r="2.5" /><circle cx="-26" cy="-54" r="2.5" />
      </g>
    </svg>
  )
}

export function GlassShards({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="400,0 250,0 330,120" fill="#3A0F1A" />
      <polygon points="400,40 300,170 400,230" fill="#5B1424" />
      <polygon points="230,300 320,190 400,300" fill="#2A0B13" />
      <polyline points="250,0 330,120 300,170 320,190 230,300" fill="none" stroke="#D7263D" strokeWidth="1" />
    </svg>
  )
}
