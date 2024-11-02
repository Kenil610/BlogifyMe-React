import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then(async (post) => {
                if (post) {
                    const imageUrl = await appwriteService.getFilePreview(post.featuredImage);
                    setPost({ ...post, imageUrl });
                } else {
                    navigate('/');
                }
                setLoading(false);
            });
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deletePost(post.featuredImage);
                navigate('/');
            }
        });
    };

    if (loading) {
        return (
            <div className="home-container">
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="post-page">
            <Container>
                <div className="post-card">
                    <div className="post-card-header">
                        <img src={post.imageUrl} alt={post.title} className="post-card-image" />
                        {isAuthor && (
                            <div className="post-card-actions">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button>Edit</Button>
                                </Link>
                                <Button onClick={deletePost}>Delete</Button>
                            </div>
                        )}
                    </div>
                    <div className="post-card-body">
                        <h1 className="post-card-title">{post.title}</h1>
                        <div className="post-card-content">{parse(post.content)}</div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;
