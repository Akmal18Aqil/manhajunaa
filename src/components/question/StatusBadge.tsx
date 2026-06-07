import React from 'react'

export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    HALL: { label: 'HALL', className: 'badge badge-hall' },
    MAUQUF: { label: 'MAUQUF', className: 'badge badge-mauquf' },
    TERSELESAIKAN: { label: 'TERSELESAIKAN', className: 'badge badge-solved' },
    MUGHLAQ: { label: 'MUGHLAQ', className: 'badge badge-closed' },
  }

  const info = map[status] || { label: status, className: 'badge' }

  return <span className={info.className}>{info.label}</span>
}
