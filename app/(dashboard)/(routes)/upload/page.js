
"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { app } from '@/firebaseConfig'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import GenerateRandomString from '@/app/_utils/GenerateRandomString';
import generateRandomString from '@/app/_utils/GenerateRandomString';
import { useRouter } from 'next/navigation';


const Upload = () => {
  const router=useRouter();

  const {user} = useUser();
  const [progress, setProgress] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(0);
  const [fileDocId, setFileDocId] = useState(0);
  const storage = getStorage(app)
  const db = getFirestore(app);

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type
    };
    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file,metadata);
   
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task pr ogress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
        

        
          progress == 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            saveInfo(file,downloadURL);
          });
          
        

      },)

  }

  const saveInfo=async(file,fileUrl)=>{
    const docId=generateRandomString().toString();
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName:file?.name,
      fileSize:file?.size,
      fileType:file.type,
      fileUrl:fileUrl,
      userEmail:user.primaryEmailAddress.emailAddress,
      userName:user.fullName,
      password:'',
      id:docId,
      shortUrl:process.env.NEXT_PUBLIC_BASE_URL+docId,

    })
    setFileDocId(docId);
  }
  useEffect(() => {
    progress == 100 && setTimeout(() => {
      setUploadCompleted(true);
    }, 2000)
  }, [progress == 100])
  useEffect(() => {
    uploadCompleted && setTimeout(() => {
      setUploadCompleted(false);
      router.push('/file-preview/'+fileDocId);
    }, 2000)
  }, [uploadCompleted == true])

  return (
    <div className='p-5 px-8 md:px-28'>
  {uploadCompleted ? (
    <div>YES</div>
  ) : (
    <div>
      <h2 className='text-[20px] text-center m-5'>Start
        <strong className='text-primary'> Uploading </strong>  File and
        <strong className='text-primary'> Share </strong> it
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
    </div>
  )}
</div>

  )
}

export default Upload