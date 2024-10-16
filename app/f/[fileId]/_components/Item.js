'use client'
import { Download } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function Item({ File }) {
    const [password, setpassword] = useState()
    return File && (
        <div>
            <div className='p-5 rounded-md bg-white flex flex-col items-center'>
                <div className='text-center flex-col items-center flex'>
                    <h2 className='text-[20px] text-gray-600'>
                        <strong className='text-primary'>{File.userName} </strong>
                        Shared the file with You
                    </h2>

                    <h2 className='text-[10px] text-gray-400'>Find File details below</h2>
                    <Image src={'/file.jpg'} width={150} height={150} alt='file' color="blue" />
                    <h2 className='text-gray-500 text-[15px]'>{File.fileName}/{File.fileType}/{File.fileSize}</h2>
                </div>

               {File.password.length>3 ? <input onChange={(e)=>setpassword(e.target.value)} type="password"
                    className='p-2 border rounded-md text-[14px] mt-5 text-center outline-blue-400'
                    placeholder='Enter password to access'
                />:null}

                <button onClick={()=>window.open(File.fileUrl)} className='flex gap-2 p-2 bg-primary text-white rounded-full w-full items-center hover:bg-blue-600 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300' disabled={File.password!=password}>
                    <Download className='h-4 w-4' />Download
                </button>
                <h2 className='text-gray-400 text-[12px]'>*Term and Condition apply</h2>
            </div>
        </div>
    )
}

export default Item