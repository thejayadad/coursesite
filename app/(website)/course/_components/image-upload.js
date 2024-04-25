import React, { useCallback, useRef } from 'react';
import { FiImage } from "react-icons/fi";

const ImageUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'uploadsite'); 

      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/socialsite/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        onUpload(data.secure_url); 
      } catch (err) {
        console.error('Error uploading image', err);
      }
    }
  }, [onUpload]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        <FiImage /> Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;
