'use client'
import GlobalApi from '@/app/utils/GlobalApi';
import { app } from '@/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { Upload, Copy } from 'lucide-react'; // Using 'Copy' icon for URL copying
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FilePreview({ params }) {
  const [File, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false); // State for enabling/disabling password input
  const db = getFirestore(app);
  const {user}=useUser()
  useEffect(() => {
    params?.fileId && getFileInfo();
  }, []);

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFile(docSnap.data());
    } else {
      console.log("No such Document");
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(File?.shortUrl);
    toast.success("Short URL copied to clipboard!")
  };

  const handleSavePassword = async() => {
     const docRef=doc(db,"uploadedFile",params?.fileId);
     await updateDoc(docRef,{
      password:password
     })
     
     toast.success("password Saved Succussfully")
  };

  // const handleSendEmail = () => {
  //   alert(`File sent to "${email}"!`);
  // };

  const SendEmail=()=>{
    const data={
      emailToSend:email,
      userName:user?.fullName,
      fileName:File.fileName,
      fileSize:File.fileSize,
      fileType:File.fileType,
      shortUrl:File.shortUrl
    }
    GlobalApi.SendEmail(data).then(resp=>{
      console.log(resp)
    })
  }
  
  return (
    <>
        <ToastContainer />
      <div className='flex gap-4 m-5'>
        <div><Link href='/upload'><Upload className='rotate-[-90deg]' /></Link></div>
        <strong className='text-gray-500'>Go to upload</strong>
      </div>

      {File && (
        <div className='flex flex-col w-full h-full justify-center items-center'>
          {/* Parent container with dotted border */}
          <div className='border-2 border-dotted border-gray-400 p-6 rounded-lg'>
            <div className='flex flex-col md:flex-row'> {/* Change to column for small screens */}
              {/* Left Div */}
              <div className='w-full md:w-1/2 px-4 md:p-4 text-black border rounded-lg'>
                <div className='flex justify-center items-center pt-8'>
                  <Image src={File.fileUrl} alt={File.fileName} width={350} height={300} className='border rounded-lg' />
                </div>
                <div className='flex flex-col justify-center mt-6'>
                  <p className='mt-2 text-gray-500'><strong>File Name:</strong> {File.fileName}</p>
                  <p className='mt-1 text-gray-500'><strong>File Type:</strong> {File.fileType}</p>
                </div>
              </div>

              {/* Right Div */}
              <div className='w-full md:w-1/2 p-6 text-gray-500 flex flex-col'>
                <div className='mb-4'>
                  <p><strong className='text-gray-500'>Short URL:</strong></p>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      value={File.shortUrl}
                      readOnly
                      className='w-full p-2 text-gray-500 border border-gray-300 rounded'
                    />
                    <button onClick={handleCopyUrl} className='ml-2'>
                      <Copy className='text-blue-500 cursor-pointer' />
                    </button>
                  </div>
                </div>

                <div className='mb-4'>
                  <p><strong className='text-gray-500'>Password</strong></p>
                  <div className='flex items-center mb-2'>
                    <input
                      type='checkbox'
                      checked={isPasswordEnabled}
                      onChange={() => setIsPasswordEnabled(!isPasswordEnabled)}
                      className='mr-2'
                    />
                    <span className='text-gray-500'>Enable Password</span>
                  </div>
                  {isPasswordEnabled && (
                    <div className='flex items-center'>
                      <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter password'
                        className='w-full p-2 text-black border border-gray-300 rounded'
                      />
                      <button 
                        onClick={handleSavePassword} 
                        className='ml-2 text-white bg-primary px-2 py-2 rounded-lg hover:bg-gray-200'>
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className='mb-4 border border-gray-300 rounded px-4 py-5'>
                  <p><strong className='text-gray-500'>Send File to Email</strong></p>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='example@example.com'
                    className='w-full p-2 text-black border border-gray-300 rounded'
                  />
                  <button 
                    onClick={()=> SendEmail()} 
                    className='mt-2 bg-primary text-white w-full px-4 py-2 rounded hover:bg-gray-200'>
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilePreview;
