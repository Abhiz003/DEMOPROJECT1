import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AllBlogs.css';
import { Button } from 'react-bootstrap';

const AdminBlogs = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/blogs/myblogs');
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching blogs data:', error);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="exhibition-container">
        <div className="exhibition-header">
          <h2 className="exhibition-title">All Blogs</h2>
          <Link to="/admin/add-exhibition">
            <Button>Add Blog</Button>
          </Link>
        </div>
        <div className="exhibition-list">
          {blogData.map((blog) => (
            <div key={blog.id} className={`exhibition-card ${blog.status}`}>
              <img src={blog.image} alt={blog.title} className="exhibition-image" />
              <h3 className="exhibition-name">{blog.title}</h3>
              <p className="exhibition-info">
                <span className="exhibition-label">Date:</span> {formatDate(blog.date)}
              </p>
              <p className="exhibition-info">
                <span className="exhibition-label">Venue:</span> {blog.venue}
              </p>
              <p className="exhibition-description">{blog.description}</p>
              
              <Link to={`/admin/update-exhibition/${blog.id}`}>
                <Button className='btn btn-secondary'>Edit</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBlogs;
