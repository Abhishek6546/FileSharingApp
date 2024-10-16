'use client'
import React, { useState, useEffect } from 'react'
import UploadForm from './_components/UploadForm'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '@/firebaseConfig'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { useUser } from '@clerk/nextjs'
import { generateRandomString } from '@/app/utils/GenerateRandomString'
import { useRouter } from 'next/navigation'

function Upload() {
  const router = useRouter();
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const [fileDocId, setFileDocId] = useState(null); // Initialize to null
  const storage = getStorage(app);
  const db = getFirestore(app);

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type
    };
    const storageRef = ref(storage, 'uploadedFile' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);

        if (progress === 100) {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            toast.success("File Uploaded Successfully");
            saveInfo(file, downloadURL);
          });
        }
      },
      (error) => {
        // Handle error here
        console.error("Upload failed", error);
        toast.error("File Upload Failed");
      }
    );
  }

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString();
    await setDoc(doc(db, 'uploadedFile', docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId
    });
    setFileDocId(docId); // Set the document ID
  }

  useEffect(() => {
    if (fileDocId) {
      // Redirect to the file preview page once the document ID is set
      router.push("/file-preview/" + fileDocId);
    }
  }, [fileDocId, router]); // Dependency array includes fileDocId and router

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>Start <strong className='text-primary'>Uploading</strong> File and <strong className='text-primary'>Share</strong> it</h2>
      <UploadForm uploadBtnClick={uploadFile} progress={progress} />
      <ToastContainer />
    </div>
  )
}

export default Upload;
