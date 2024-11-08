import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                setLoading(true);
                const response = await appwriteService.getPostsByUser();
                if (response && response.documents) {
                    setPosts(response.documents); // Set both active and inactive posts
                }
            } catch (error) {
                console.error("Error fetching all posts:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllPosts();
    }, [userData]);
    


    if (loading) {
        return (
            <div className="home-container">
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    
    const userPosts = posts.filter(post => post.userId === userData.$id);

    if (userPosts.length === 0) {
        return (
            <Container>
                <div className="no-post">
                    <h1>No Post Available</h1>
                </div>
            </Container>
        );
    }

    return (
        <div className='all-posts-wrapper'>
            <Container>
                <div className='postcard-container'>
                    {userPosts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} userData={userData} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
