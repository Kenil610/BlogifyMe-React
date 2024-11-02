import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function Postcard({ $id, title, featuredImage, userData }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      const imageUrl = await appwriteService.getFilePreview(featuredImage);
      setImageUrl(imageUrl);
    };
    
    fetchImageUrl();
  }, [featuredImage]);

  return userData ? (
    // Clickable card for logged-in users
    <Link to={`/post/${$id}`} className="postcard">
      <div>
        <div className="postcard-image">
          <img src={imageUrl} alt={title} className="postcard-img" />
        </div>
        <div className="postcard-content">
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  ) : (
    // Non-clickable card for guests
    <div
      className="postcard"
      onClick={() => alert("Please log in to read the full article.")}
    >
      <div>
        <div className="postcard-image">
          <img src={imageUrl} alt={title} className="postcard-img" />
        </div>
        <div className="postcard-content">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default Postcard;
