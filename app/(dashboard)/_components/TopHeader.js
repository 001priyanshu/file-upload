import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import React from 'react'
import Image  from 'next/image'

const TopHeader = () => {
  return (
    <div className='flex p-5 border-b items-center justify-between md:first-letter:justify-end'>
        <AlignJustify className='md:hidden'/>
        <Image src='/logo.svg' width={150} height={100}
        className="md:hidden"/>
        <UserButton/>
    </div>
  )
}

export default TopHeader