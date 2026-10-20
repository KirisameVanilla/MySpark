import type { ReactNode } from 'react'

interface Props {
  fileNo: string
  title: string
  id: string
  children?: ReactNode
}

export function SectionHead({ fileNo, title, id, children }: Props) {
  return (
    <div className="section-head">
      <div className="title">
        <span className="file-no" aria-hidden="true">{fileNo}</span>
        <h2 id={id}>{title}</h2>
      </div>
      {children}
    </div>
  )
}
