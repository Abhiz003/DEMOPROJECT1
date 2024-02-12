import React, { useEffect, useState } from 'react'
import './AllBlogs.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CustomNavbar from './CustomNavbar';


const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]); 

  useEffect(() => {
    getUserBlogs();

  }, []);

  const getUserBlogs = async () => {
    const result = await axios.get("http://localhost:8080/blogs/getBlogs"); 
    setBlogs(result.data);
  }

  return (
    <>
    <CustomNavbar/>
      <div className="container">
        {blogs.map((blog, index) => (
          <div key={index} className="card" style={{ width: "18rem", marginBottom: "10px" }}>
            <div className="card-body">
              <p className="card-text">
                <p>Place Name: {blog.title}</p>
                <p>Start Date: {blog.startDate}</p>
                <p>End Date: {blog.endDate}</p>
                <p>Members: {blog.members}</p>
                <p>Total Cost: {blog.totalCost}</p>
                <p>Transportation Mode: {blog.transportationMode}</p>
                {/* Add more fields as needed  and try to add username at bottom right to show whose Blog is this*/}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllBlogs;




















// import React, { useEffect, useState } from 'react';
// import './AllBlogs.css';
// import CustomNavbar from './CustomNavbar';

// const AllBlogs = () => {
//   const [blogsData, setBlogsData] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/exhibitions/get/exhibitions');
//         const data = await response.json();
//         setBlogsData(data);
//       } catch (error) {
//         console.error('Error fetching blogs data:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   return (
//     <>
//       <CustomNavbar />
//       <div className="exhibition-container">
//         <h2 className="exhibition-title">All Blogs of Bloggers</h2>
//         <div className="exhibition-list">
//           {blogsData.map((blog) => (
//             <div key={blog.id} className={`exhibition-card ${blog.status}`}>
//               <img src={blog.image} alt={blog.title} className="exhibition-image" />
//               <h3 className="exhibition-name">{blog.title}</h3>
//               <p className="exhibition-info">
//                 <span className="exhibition-label">Date:</span> {formatDate(blog.date)}
//               </p>
//               <p className="exhibition-info">
//                 <span className="exhibition-label">Venue:</span> {blog.venue}
//               </p>
//               <p className="exhibition-description">{blog.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllBlogs;
