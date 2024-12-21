import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById } from '../services/apiService';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load post details.');
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1 className="mb-4">Post Details</h1>
      {post && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <p className="card-text">
              <small className="text-muted">Post ID: {post.id}</small>
            </p>
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
