import React, { useState } from 'react';

function VideoUpload() {
    const [videoBase64, setVideoBase64] = useState('');
    const [videoPreview, setVideoPreview] = useState('');
    const [videoId, setVideoId] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                setVideoBase64(base64String);
                setVideoPreview(reader.result);
            };
            reader.onerror = (error) => {
                console.error('Error: ', error);
            };
        }
    };

    const handleUpload = async () => {
        try {
            const response = await fetch('http://localhost:8080/photo/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ video: videoBase64 }),
            });
            const data = await response.json();
            alert(data.message);
            setVideoId(data.videoId);
        } catch (error) {
            console.error('Error uploading video: ', error);
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Video</button>
            {videoPreview && (
                <div>
                    <h2>Video Preview:</h2>
                    <video width="400" controls>
                        <source src={videoPreview} type="video/mp4" />
                    </video>
                </div>
            )}
            {videoId && (
                <div>
                    <h2>Video ID:</h2>
                    <p>{videoId}</p>
                </div>
            )}
        </div>
    );
}

export default VideoUpload;
