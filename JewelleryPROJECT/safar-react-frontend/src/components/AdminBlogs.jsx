import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/MyBlogs.css';
import { Button } from 'react-bootstrap';

const AdminBlogs = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get/Blogs`);
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching blogs data:', error);
      }
    };

    fetchBlogs();
  }, []);

 

  return (
    <>
     <h1>This are Admin Blogs Component</h1>
    </>
  );
};

export default AdminBlogs;
