import React, { useState, useEffect } from 'react';
import { Container } from '../components';
import appwriteService from '../appwrite/config';
import Postcard from '../components/PostCard';
import '../App.css';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchActivePosts = async () => {
            try {
                setLoading(true);
                const response = await appwriteService.getPosts();
                if (response && response.documents) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching active posts:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchActivePosts();
    }, []);

    

    if (loading) {
        return (
            <div className="home-container">
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }


    if (posts.length === 0) {
        return (
            <Container>
                <div className="no-post">
                    <h1>No Posts Available</h1>
                </div>
            </Container>
        );
    }

    return (
        <div className="home-container">
            <Container>
                <div className="postcard-container">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <Postcard {...post} userData={userData} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
