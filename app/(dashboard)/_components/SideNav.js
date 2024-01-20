"use client"
import { Shield, Upload, File } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const SideNav = () => {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
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
    const [activeIndex,setActiveIndex] = useState(0)
    return (
        <div>
            <div className='p-5 border-b'>
                <Image src='logo.svg' width={50} height={50} />
            </div>
            <div className='flex flex-col float-left'>

                {menuList.map((item, index) => (
                    <button className='flex gap-2 p-4 px-0 hover:bg-gray-100 w-full text-gray-500'
                    onClick={()=>setActiveIndex(index)}
                    >
                        <item.icon/>
                        <h2>{item.name}</h2>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SideNav