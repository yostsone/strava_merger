import React, { ChangeEvent } from 'react';
type FileUploadProps = {
  labelText: string;
  dropId: string;
  uploadId: string;
  file: File | null
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};
export default function FileUpload({labelText, dropId, uploadId, handleChange, handleDrop, file}: FileUploadProps) {
  return (
      <div className="flex flex-col py-2">
        <h2>{labelText}</h2>
        <div
            className="border-2 border-dashed border-lime-900 bg-amber-50 text-center mb-10 mt-2"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            id={dropId}
        >
          <input
              className="h-0 w-0 p-px absolute"
              name={dropId}
              id={uploadId}
              type="file"
              onChange={handleChange}
          />
          <label id={dropId} htmlFor={uploadId} className="p-10 block cursor-pointer">
            {file
                ? file.name
                : 'Drag & drop files here or click to select'}
          </label>
        </div>
      </div>
  )
}

/**
 * Handles drag events to prevent default behavior
 * @param e
 */
function handleDrag(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
}