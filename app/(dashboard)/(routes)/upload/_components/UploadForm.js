import React, { useState } from 'react'
import AlertMsg from './AlertMsg';
import FilePreview from "./FilePreview"
import ProgressBar from './ProgressBar';

function UploadForm({uploadBtnClick,progress}) {
    const [file, setFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const onFileSelect = (file) => {
        if (file) {
            // 2MB in bytes
            const maxFileSize = 2 * 1024 * 1024;
            
            if (file.size > maxFileSize) {
                console.log("Size is Greater than 2MB");
                setErrorMsg('Maximum File Upload Size is 2MB');
                setFile(null); // Clear file if size is too large
            } else {
                setErrorMsg(null);
                setFile(file); // File is valid, set it to state
            }
        }
    };

    return (
        <div className='text-center'>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 rounded-lg bg-gray-100"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-12 h-12 mb-4  text-primary"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 md:text-2xl text-lg text-gray-500 ">
                            <span className="font-semibold">Click to upload</span> or <strong className='text-primary'>drag</strong> and <strong className='text-primary'>drop</strong>
                        </p>
                        <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX Size: 2MB)</p>
                    </div>
                    <input
                        onChange={(event) => onFileSelect(event.target.files[0])}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                    />
                </label>
            </div>
            {errorMsg ? <AlertMsg msg={errorMsg} /> : null}
            {file ?  <FilePreview file={file} removeFile={()=>setFile(null)}/>:null}
          
            {progress>0?<ProgressBar progress={progress}/>: <button onClick={()=>uploadBtnClick(file)}
                disabled={!file}
                className='p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400'
            >
                Upload
            </button>}
        </div>
    );
}

export default UploadForm;
