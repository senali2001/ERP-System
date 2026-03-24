'use client'

interface StatCardProps {
  label: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
  accentColor: string
}

export default function StatCard({ label, value, change, positive, icon, accentColor }: StatCardProps) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      transition: 'border-color 0.2s',
      cursor: 'default',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-light)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
          {label}
        </div>
        <div style={{
          width: 34, height: 34,
          borderRadius: 10,
          background: `${accentColor}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accentColor,
        }}>
          {icon}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ marginTop: 6, fontSize: 11.5, fontWeight: 500, color: positive ? 'var(--accent-green)' : 'var(--accent-red)' }}>
          {positive ? '↑' : '↓'} {change} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs last month</span>
        </div>
      </div>
    </div>
  )
}
