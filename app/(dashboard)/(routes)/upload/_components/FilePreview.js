import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

 function FilePreview({file,removeFile}){

    return(
        <div className="flex items-center gap-2  justify-between mt-5 border rounded-md p-2 border-blue-200">
         <div className="flex items-center p-2 ">
               <Image src={'/file.jpg'} width={50} height={50} alt='file' color="blue"/>
               <div className="text-left">
                <h2>{file.name}</h2>
                <h2 className="text-[12px] text-gray-400">{file?.type} / {(file.size/1024/1024).toFixed(2)}MB</h2>

            </div>
         </div>
            <X onClick={()=>removeFile()} className="text-red-500 cursor-pointer"/>
        </div>
    )

}

export default FilePreview;