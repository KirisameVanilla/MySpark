const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const ArrowRight = ({ size = 18 }: { size?: number }) => (
  <svg {...base} width={size} height={size}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Download = () => (
  <svg {...base}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
)

export const Mail = () => (
  <svg {...base} strokeWidth={2.2}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)
