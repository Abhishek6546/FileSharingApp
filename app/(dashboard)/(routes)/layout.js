import React from 'react'
import SideNav from '../_components/SideNav'
import TopHeader from '../_components/TopHeader'

function Layout({ children }) {
  return (
    <div className='shadow-sm border-r h-full'>
      {/* Sidebar for medium and larger screens */}
      <div className='hidden md:flex h-full md:w-64 flex-col fixed inset-y-0 z-50'>
        <SideNav />
      </div>

      {/* Adjust content margin for medium screens (accounting for SideNav) */}
      <div className='md:ml-64'>
        <TopHeader />
        {children}
      </div>
    </div>
  )
}

export default Layout
