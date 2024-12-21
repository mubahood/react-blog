import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/apiService';
import { Link } from 'react-router-dom';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts.');
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPosts(posts.filter((post) => post.title.toLowerCase().includes(term)));
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1 className="mb-4">Posts</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredPosts.slice(0, 10).map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-truncate" title={post.title}>{post.title}</h5>
                <p className="card-text text-muted">{post.body.substring(0, 100)}...</p>
                <Link to={`/details/${post.id}`} className="btn btn-outline-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
