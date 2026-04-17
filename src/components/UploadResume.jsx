import React, { useCallback, useRef, useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import clsx from 'clsx';

export function UploadResume({ file, setFile }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateAndSetFile = useCallback((selectedFile) => {
    const validTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF or DOCX file.");
    }
  }, [setFile]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  }, [validateAndSetFile]);

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div 
      className={clsx(
        "relative w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all bg-white cursor-pointer group overflow-hidden",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-slate-50",
        file && "border-solid border-green-500 bg-green-50"
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
          }
        }}
        accept=".pdf,.docx,.doc"
        className="hidden"
      />
      
      {!file ? (
        <>
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="text-slate-700 font-medium text-center">
            Click or drag and drop to upload
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Accepts PDF and DOCX (Max 5MB)
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 z-10">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <div className="text-center px-4">
            <p className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-xs" title={file.name}>
              {file.name}
            </p>
            <p className="text-sm text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={removeFile}
            className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 mt-2 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
          >
            <X className="w-4 h-4" /> Remove File
          </button>
        </div>
      )}
      
      {/* Background decoration */}
      {isDragActive && (
        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
      )}
    </div>
  );
}
