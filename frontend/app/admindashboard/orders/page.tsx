'use client'
import { useState } from 'react'
import { ShoppingCart, Search, Eye, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, Package, RefreshCw } from 'lucide-react'

const ORDERS = [
  { id: '#SS-1042', customer: 'Walk-in Customer', items: 5, total: 2840, payment: 'Cash',  cashier: 'Priya K.', status: 'COMPLETED',  date: '2026-07-15 14:22' },
  { id: '#SS-1041', customer: 'Ramesh Perera',    items: 2, total: 1190, payment: 'Card',  cashier: 'Amara F.', status: 'COMPLETED',  date: '2026-07-15 13:55' },
  { id: '#SS-1040', customer: 'Walk-in Customer', items: 8, total: 4320, payment: 'Cash',  cashier: 'Priya K.', status: 'PROCESSING', date: '2026-07-15 13:30' },
  { id: '#SS-1039', customer: 'Dilani Silva',     items: 3, total: 1650, payment: 'Card',  cashier: 'Amara F.', status: 'COMPLETED',  date: '2026-07-15 12:48' },
  { id: '#SS-1038', customer: 'Walk-in Customer', items: 1, total:  280, payment: 'Cash',  cashier: 'Ruwan B.', status: 'CANCELLED',  date: '2026-07-15 12:10' },
  { id: '#SS-1037', customer: 'Kumari Jayasinghe',items: 6, total: 3870, payment: 'Mobile',cashier: 'Priya K.', status: 'COMPLETED',  date: '2026-07-15 11:45' },
  { id: '#SS-1036', customer: 'Walk-in Customer', items: 4, total: 2110, payment: 'Cash',  cashier: 'Amara F.', status: 'PENDING',    date: '2026-07-15 11:20' },
  { id: '#SS-1035', customer: 'Nalin Fernando',   items: 7, total: 5490, payment: 'Card',  cashier: 'Sachini R.',status:'COMPLETED',  date: '2026-07-15 10:58' },
  { id: '#SS-1034', customer: 'Walk-in Customer', items: 2, total:  760, payment: 'Cash',  cashier: 'Ruwan B.', status: 'COMPLETED',  date: '2026-07-15 10:30' },
  { id: '#SS-1033', customer: 'Pradeep Rathnay.', items: 9, total: 6820, payment: 'Card',  cashier: 'Sachini R.',status:'COMPLETED',  date: '2026-07-15 09:52' },
]

const STATUS_CFG: Record<string, { cls: string; icon: React.ReactNode }> = {
  COMPLETED:  { cls: 'badge-green',  icon: <CheckCircle size={11} /> },
  PROCESSING: { cls: 'badge-blue',   icon: <RefreshCw size={11} /> },
  PENDING:    { cls: 'badge-orange', icon: <Clock size={11} /> },
  CANCELLED:  { cls: 'badge-red',    icon: <XCircle size={11} /> },
}
const PAGE_SIZE = 6

export default function OrdersPage() {
  const [search, setSearch]   = useState('')
  const [statusF, setStatusF] = useState('ALL')
  const [page, setPage]       = useState(1)

  const pending    = ORDERS.filter(o => o.status === 'PENDING').length
  const processing = ORDERS.filter(o => o.status === 'PROCESSING').length
  const completed  = ORDERS.filter(o => o.status === 'COMPLETED').length
  const cancelled  = ORDERS.filter(o => o.status === 'CANCELLED').length

  const filtered = ORDERS.filter(o => {
    const q = search.toLowerCase()
    const matchQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.cashier.toLowerCase().includes(q)
    const matchS = statusF === 'ALL' || o.status === statusF
    return matchQ && matchS
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Orders</h1>
          <p className="page-subtitle">Real-time order tracking and management</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="live-dot" />
          <span style={{ fontSize: 12.5, color: 'var(--color-green)', fontWeight: 600 }}>Live Feed</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Pending',    value: pending,    color: '#d97706', icon: <Clock size={16} /> },
          { label: 'Processing', value: processing, color: '#2563eb', icon: <RefreshCw size={16} /> },
          { label: 'Completed',  value: completed,  color: '#059669', icon: <CheckCircle size={16} /> },
          { label: 'Cancelled',  value: cancelled,  color: '#dc2626', icon: <XCircle size={16} /> },
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
          <input className="admin-input" placeholder="Search order, customer, cashier…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} style={{ paddingLeft: 34, height: 36 }} />
        </div>
        {['ALL','PENDING','PROCESSING','COMPLETED','CANCELLED'].map(f => (
          <button key={f} className={`btn btn-sm ${statusF === f ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setStatusF(f); setPage(1) }}>
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-muted)' }}>{filtered.length} orders</span>
      </div>

      <div className="admin-card" style={{ overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>{['Order #','Customer','Items','Total','Payment','Cashier','Status','Date'].map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {paged.map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace', fontSize: 13 }}>{o.id}</td>
                <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{o.customer}</td>
                <td style={{ display: 'flex', alignItems: 'center', gap: 5, paddingTop: 14 }}>
                  <Package size={13} color="var(--text-muted)" /> {o.items}
                </td>
                <td style={{ fontWeight: 700, color: 'var(--color-green)', fontSize: 13 }}>Rs.{o.total.toLocaleString()}</td>
                <td><span className="badge badge-gray">{o.payment}</span></td>
                <td style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{o.cashier}</td>
                <td>
                  <span className={`badge ${STATUS_CFG[o.status]?.cls}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {STATUS_CFG[o.status]?.icon} {o.status}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{o.date}</td>
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
