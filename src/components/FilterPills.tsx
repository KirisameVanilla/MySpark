interface Props<T extends string> {
  label: string
  options: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
}

export function FilterPills<T extends string>({ label, options, value, onChange }: Props<T>) {
  return (
    <div className="chip-row" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className="chip-btn"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
