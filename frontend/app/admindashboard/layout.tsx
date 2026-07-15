'use client'
import { useState, useEffect } from 'react'
import './admin.css'
import Sidebar from './Sidebar'
import AdminHeader from './Header'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('smartstore-sidebar')
    if (saved === 'collapsed') setCollapsed(true)
  }, [])

  const toggleSidebar = () => {
    setCollapsed(prev => {
      const next = !prev
      localStorage.setItem('smartstore-sidebar', next ? 'collapsed' : 'expanded')
      return next
    })
  }

  const sidebarW = collapsed ? 72 : 260

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

      <div
        style={{
          marginLeft: sidebarW,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          transition: 'margin-left 0.25s ease',
        }}
      >
        <AdminHeader sidebarCollapsed={collapsed} onMenuClick={toggleSidebar} />

        <main style={{ flex: 1, padding: '24px', overflowX: 'hidden' }}>
          {children}
        </main>
      </div>
    </div>
  )
}