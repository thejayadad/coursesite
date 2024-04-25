'use client'
import React, { useCallback, useRef, useState } from 'react';
import { FiVideo } from "react-icons/fi";

const VideoUpload = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = useCallback(async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'uploadsite');

            try {
                setUploading(true); // Set uploading to true before starting upload
                const res = await fetch(
                    'https://api.cloudinary.com/v1_1/socialsite/video/upload',
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
                const data = await res.json();
                onUpload(data.secure_url);
                setUploading(false); // Set uploading to false after successful upload
            } catch (err) {
                console.error('Error uploading video', err);
                setUploading(false); // Set uploading to false after error
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
                accept="video/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                <FiVideo /> Upload Video
            </button>
            {uploading && <p>Uploading video... This may take a moment.</p>}
        </div>
    );
};

export default VideoUpload;
