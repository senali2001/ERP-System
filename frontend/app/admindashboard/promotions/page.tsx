'use client'
import { useState } from 'react'
import { Tag, Plus, Search, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, X, Percent, Clock, CheckCircle, XCircle } from 'lucide-react'

const PROMOS = [
  { id: 'PRO-001', name: 'Weekend Flash Sale',      type: 'Percentage Discount', products: 'All Beverages',     discount: '20%',  startDate: '2026-07-18', endDate: '2026-07-20', status: 'UPCOMING'  },
  { id: 'PRO-002', name: 'Buy 2 Get 1 Free',         type: 'BOGO',                products: 'Dettol Soap 75g',   discount: 'BOGO', startDate: '2026-07-10', endDate: '2026-07-31', status: 'ACTIVE'    },
  { id: 'PRO-003', name: 'Mid-Month Grocery Deal',   type: 'Flat Discount',       products: 'Grocery Category',  discount: 'Rs.50',startDate: '2026-07-14', endDate: '2026-07-16', status: 'ACTIVE'    },
  { id: 'PRO-004', name: 'Ramadan Combo Offer',      type: 'Bundle',              products: 'Rice + Oil Combo',  discount: '15%',  startDate: '2026-06-01', endDate: '2026-06-30', status: 'EXPIRED'   },
  { id: 'PRO-005', name: 'Loyalty Points 2x',        type: 'Loyalty',             products: 'All Products',      discount: '2x Pts',startDate:'2026-07-25', endDate: '2026-07-25', status: 'UPCOMING'  },
  { id: 'PRO-006', name: 'Clearance — Dairy',        type: 'Percentage Discount', products: 'Dairy Products',    discount: '30%',  startDate: '2026-07-01', endDate: '2026-07-08', status: 'EXPIRED'   },
]

const STATUS_CFG: Record<string, { cls: string; icon: React.ReactNode }> = {
  ACTIVE:   { cls: 'badge-green',  icon: <CheckCircle size={11} /> },
  UPCOMING: { cls: 'badge-blue',   icon: <Clock size={11} /> },
  EXPIRED:  { cls: 'badge-red',    icon: <XCircle size={11} /> },
}

const PAGE_SIZE = 5

export default function PromotionsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [page, setPage]     = useState(1)

  const active   = PROMOS.filter(p => p.status === 'ACTIVE').length
  const upcoming = PROMOS.filter(p => p.status === 'UPCOMING').length
  const expired  = PROMOS.filter(p => p.status === 'EXPIRED').length

  const filtered = PROMOS.filter(p => {
    const q = search.toLowerCase()
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
    const matchF = filter === 'ALL' || p.status === filter
    return matchQ && matchF
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Promotions</h1>
          <p className="page-subtitle">Manage discounts, offers, and loyalty programs</p>
        </div>
        <button className="btn btn-primary"><Plus size={14} /> Add Promotion</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Active Promotions',   value: active,   color: '#059669', icon: <CheckCircle size={16} /> },
          { label: 'Upcoming Promotions', value: upcoming, color: '#2563eb', icon: <Clock size={16} /> },
          { label: 'Expired Promotions',  value: expired,  color: '#dc2626', icon: <XCircle size={16} /> },
        ].map(s => (
          <div key={s.label} className="admin-card stat-card" style={{ padding: '16px 18px', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</span>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <div className="search-wrap" style={{ width: 280 }}>
          <Search className="search-icon" size={14} />
          <input className="admin-input" placeholder="Search promotions…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} style={{ paddingLeft: 34, height: 36 }} />
        </div>
        {['ALL','ACTIVE','UPCOMING','EXPIRED'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setFilter(f); setPage(1) }}>{f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}</button>
        ))}
      </div>

      <div className="admin-card" style={{ overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>{['Promo ID','Promotion Name','Type','Products','Discount','Start Date','End Date','Status','Actions'].map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {paged.map(p => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{p.id}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</td>
                <td><span className="badge badge-purple">{p.type}</span></td>
                <td style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{p.products}</td>
                <td>
                  <span style={{ fontWeight: 700, color: 'var(--color-green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Percent size={12} /> {p.discount}
                  </span>
                </td>
                <td style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{p.startDate}</td>
                <td style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{p.endDate}</td>
                <td>
                  <span className={`badge ${STATUS_CFG[p.status]?.cls}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {STATUS_CFG[p.status]?.icon} {p.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-xs" style={{ color: 'var(--color-blue)' }}><Eye size={13} /></button>
                    <button className="btn btn-ghost btn-xs" style={{ color: 'var(--color-green)' }}><Pencil size={13} /></button>
                    <button className="btn btn-ghost btn-xs" style={{ color: 'var(--color-red)' }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="pagination" style={{ borderTop: '1px solid var(--border)' }}>
            <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={13} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => <button key={n} className={`page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>)}
            <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight size={13} /></button>
          </div>
        )}
      </div>
    </div>
  )
}
