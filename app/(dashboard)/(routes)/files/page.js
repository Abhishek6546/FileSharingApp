'use client';
import {  useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for the App Router

function File() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Automatically redirect to sign-in page if the user is not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in'); // Replace with your actual sign-in route
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div>
       <h2 className='mt-6 ml-4'>My Files</h2>
       <div className='border rounded-lg m-4'>
        <p className='text-gray-500 p-3'>Total File</p>
       </div>

       <div>
        
       </div>
    </div>
  );
}

export default File;