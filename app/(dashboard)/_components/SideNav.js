'use client'
import { File, Shield, Upload, X } from 'lucide-react'  // Importing the "X" icon
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation' 

function SideNav({ onClose }) {
  const router =useRouter();

  const menuList = [
    {
      id: 1,
      name: 'Upload',
      icon: Upload,
      path: 'upload'
    },
    {
      id: 2,
      name: 'Files',
      icon: File,
      path: '/files'
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: Shield,
      path: '/upgrade'
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='fixed inset-y-0 z-50 bg-white md:w-64 w-full shadow-lg md:relative md:shadow-none'>
    
      <div className='p-5 border-b flex items-center justify-between'>
        <Image src="/logo.svg" width={50} height={50} alt="Logo" />
        {/* "X" button to close SideNav */}
        <button onClick={onClose} className='md:hidden'>
          <X size={24} />
        </button>
      </div>

      {/* Sidebar Menu Items */}
      <div className='flex flex-col w-full'>
        {menuList.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveIndex(index)
              router.push(item.path);
              if (onClose) onClose(); // Close SideNav on small screens
            }}
            className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${activeIndex === index ? 'bg-blue-50 text-primary' : ''}`}
          >
            <item.icon />
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideNav
