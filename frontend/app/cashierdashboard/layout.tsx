'use client'

   
import Header from './Header'
import Slidebar from './Slidebar'   


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex' }}>
      
      {/* Sidebar */}
      <Slidebar />

      {/* Main content */}
      <div style={{ marginLeft: '240px', width: '100%' }}>
        
        {/* Header */}
        <Header />

        {/* Page content */}
        <main style={{ padding: '20px' }}>
          {children}
        </main>

      </div>
    </div>
  )
}