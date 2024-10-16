'use client'
import { app } from '@/firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Item from './_components/Item';
import Link from 'next/link';
import Image from 'next/image';

function FileView({ params }) {
    const db = getFirestore(app);

    const [File, setFile] = useState()
    useEffect(() => {
        params.fileId && getFileInfo();
    }, [])

    const getFileInfo = async () => {
        const docRef = doc(db, "uploadedFile", params?.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(docSnap.data())
            setFile(docSnap.data());
        } else {
            console.log("No such Document");
        }
    };
    return (
        <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
            <Link href=''>
                <Image src={"/logo.svg"} alt='file' width={50} height={50} />
            </Link>
            <Item File={File}/>
        </div>
    )
}

export default FileView