"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function UploadBox({ onFileSelect }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="
      border-2
      border-dashed
      border-blue-500
      rounded-2xl
      bg-slate-800/70
      backdrop-blur-md
      hover:bg-slate-700
      transition-all
      duration-300
      p-16
      text-center
      cursor-pointer
      "
    >
      <input {...getInputProps()} />

      <h2 className="text-xl font-bold">
        📂 Drag & Drop CSV Here
      </h2>

      <p>or click to upload</p>
    </div>
  );
}