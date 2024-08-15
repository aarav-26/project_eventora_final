import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VideoPlayer() {
    const { id } = useParams();
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`http://localhost:8080/photo/get/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setVideoUrl(`data:video/mp4;base64,${data.video}`);
                } else {
                    alert('Video not found');
                }
            } catch (error) {
                console.error('Error fetching video: ', error);
            }
        };

        fetchVideo();
    }, [id]);

    return (
        <div>
            <h2>Video Player</h2>
            {videoUrl && (
                <video width="400" controls>
                    <source src={videoUrl} type="video/mp4" />
                </video>
            )}
        </div>
    );
}

export default VideoPlayer;
