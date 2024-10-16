'use client'
import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import SideNav from './SideNav'

function TopHeader() {
  const [openSidenav, setOpenSidenav] = useState(false)

  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
      {/* Menu icon to toggle SideNav on small screens */}
      <AlignJustify 
        className='md:hidden' 
        onClick={() => setOpenSidenav(!openSidenav)} 
      />

      {/* Logo to toggle SideNav on small screens */}
      <Image
        onClick={() => setOpenSidenav(!openSidenav)}
        src="/logo.svg"
        width={50}
        height={50}
        className="md:hidden"
        alt="Logo"
      />

      {/* User button is always visible */}
      <UserButton />

      {/* Conditionally render SideNav on small screens */}
      {openSidenav && <SideNav onClose={() => setOpenSidenav(false)} />}
    </div>
  )
}

export default TopHeader
