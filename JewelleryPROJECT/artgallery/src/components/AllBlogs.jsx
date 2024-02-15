// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button, Modal } from 'react-bootstrap';
// import CustomNavbar from './CustomNavbar';
// import { AiOutlineDownload } from 'react-icons/ai';
// import { saveAs } from 'file-saver';
// import { useNavigate } from 'react-router-dom';
// import './MyBlogs.css';
// import axios from 'axios';
// import { getBlogImage} from '../Services/BlogService';

// const AllBlogs = () => {
//   const navigate = useNavigate();

//   const [blogs, setBlogs] = useState([]);
//   const [showDownloadConfirmation, setShowDownloadConfirmation] = useState(false);
//   const [selectedBlogId, setSelectedBlogId] = useState(null);
//   const [showZoom, setShowZoom] = useState(false);
//   const [zoomedImage, setZoomedImage] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
       
//         const response = await axios.get('http://localhost:8080/blogs/get-blogs',blogs);
//         if (response.status === 200) {
//           setBlogs(response.data);
//         } else {
//           console.error('Failed to fetch blogs:', response.statusMessage);
//         }
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleShowDownloadConfirmation = (blogId) => {
//     setSelectedBlogId(blogId);
//     setShowDownloadConfirmation(true);
//   };

//   const handleConfirmDownload = () => {
//     handleDownload(selectedBlogId);
//     setShowDownloadConfirmation(false);
//   };

//   const handleCancelDownload = () => {
//     setSelectedBlogId(null);
//     setShowDownloadConfirmation(false);
//   };

//   const handleOpenZoom = (blogId) => {
//     setZoomedImage(getBlogImage(blogId));
//     setShowZoom(true);
//   };

//   const handleZoomOut = () => {
//     setShowZoom(false);
//   };

//   const handleDownload = (blogId) => {
//     const contentType = 'image/png';

//     fetch(getBlogImage(blogId))
//       .then((response) => response.blob())
//       .then((blob) => {
//         const file = new File([blob], `Blog_${blogId}.png`, { type: contentType });

//         saveAs(file);
//       })
//       .catch((error) => {
//         console.error('Error downloading image:', error);
//       });
//   };

//   const handleContextMenu = (event) => {
//     event.preventDefault();
//   };

//   const WORDS_LIMIT = 30; // Set your desired word limit

//   const truncateDescription = (description) => {
//     const words = description.split(' ');
//     if (words.length > WORDS_LIMIT) {
//       return words.slice(0, WORDS_LIMIT);
//     }
//     return description;
//   };
//   return (
//     <>
//       <CustomNavbar />
//       <Container className="mt-5 my-blogs-container">
//         <h1 className="mb-4 head text-center">My Journey Tales</h1>

//         {blogs.length === 0 ? (
//           <p className="text-center">No blogs available.</p>
//         ) : (
//           <>
//             {blogs.map((blog, index) => (
//               <Card key={blog.id} className='mb-2 blog-container'>
//                 <Card.Body className="blog-container">
//                   <div className="blog-image">
//                     <img
//                       className="blogs"
//                       src={`Images/${blog.photoUrl}`}
//                       alt={`Blog ${blog.id}`}
//                       onClick={() => handleOpenZoom(blog.id)}
//                       onContextMenu={handleContextMenu}
//                     />
//                   </div>

//                   <div className="blog-info">
//                     <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
//                       <span style={{ marginRight: '10px' }}></span> Blog title - {blog.title}
//                       <Button
//                         variant="secondary"
//                         className="downloadButton"
//                         onClick={() => handleShowDownloadConfirmation(blog.id)}
//                         style={{ marginLeft: '10px' }}
//                       >
//                         <AiOutlineDownload size={20} />
//                       </Button>
//                     </p>
//                     <p>
//                       <b>Start date:</b> {blog.startDate} &nbsp;
//                       <b>End date:</b> {blog.endDate}
//                     </p>
//                     <p>
//                       <b>Members:</b> {blog.members} &nbsp;
//                       <b>Total cost:</b> {blog.totalCost}
//                     </p>
//                     <p>
//                       <b>Transportation:</b> {blog.transportationMode}
//                     </p>
//                     <p style={{ marginTop: '10px', padding: '20px', fontStyle: 'italic' }}>
//                       {truncateDescription(blog.blogDescription)}{' '}
//                       {blog.blogDescription.length > WORDS_LIMIT && (
//                         <span className="read-more-link" >
//                           ...
//                         </span>
//                       )}
//                     </p>
//                     <Button onClick={() => navigate('/my-logs')} > View</Button> &nbsp;
//                   </div>
//                 </Card.Body>
//               </Card>
//             ))}
//           </>
//         )}
//       </Container>

//       <Modal show={showDownloadConfirmation} onHide={handleCancelDownload}>
//         <Modal.Header closeButton>
//           <Modal.Title> Confirm Download</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>You're about to immortalize this blog on your device! 🚀</p>
//           <p>Hit the "Download" button and know more about my journey! 🎉</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancelDownload}>
//             Nah, I'll pass 😎
//           </Button>
//           <Button variant="primary" onClick={handleConfirmDownload}>
//             Download this journey 🌟
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showZoom} onHide={() => setShowZoom(false)}>
//         <Modal.Body className="p-0">
//           <img
//             className="arts zoomed-image"
//             src={zoomedImage}
//             alt={`Zoomed view`}
//             onContextMenu={handleContextMenu}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleZoomOut}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default AllBlogs;




























import React, { useState, useEffect } from 'react';
import { Container, Card, Pagination, Button, Modal } from 'react-bootstrap';
import CustomNavbar  from './CustomNavbar';
import { AiOutlineDownload } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import {Link} from 'react-router-dom'
import './Collections.css';
import axios from 'axios';


const AllBlogs = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getUserBlogs();
  }, []);
  
  const getUserBlogs = async () => {
    try {
      const result = await axios.get("http://localhost:8080/blog/fetchAllBlogs");
      setBlogs(result.data.list);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  
  return (
    <>
      <CustomNavbar />
      <main className="container container-fluid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog d-flex flex-column flex-md-row">
            <section className="place-image">
              <img src={blog.photoUrl} className="img-fluid" alt="" />
            </section>
            <section className="details-part flex-grow-1 p-3">
          <div className="main-parent mt-2">
            <div className="main-box1">
              <h3>{blog.title}</h3>
            </div>
            <div className="main-box2">
              <label>Start date: </label> <span>{blog.startDate}</span>
            </div>
            <div className="main-box3">
              <label>End date: </label> <span>{blog.endDate}</span>
            </div>
            <div className="main-box4">
              <label>Members: </label> <span>{blog.members}</span>
            </div>
            <div className="main-box4">
              <label>Description: </label> <span>{blog.blogDescription}</span>
            </div>
            <div className="main-box5">
              <label>Total cost: </label> <span>{blog.totalCost}</span>
            </div>
            <div className="main-box6">
              <label>Transportation: </label> <span>{blog.transportationMode}</span>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Link className="btn btn-primary" to="/logs">
              View
            </Link>
          </div>
        </section>
          </div>
        ))}
        <Link className="btn btn-success mt-4" to="/add-blog">
          Add a Blog
        </Link>
      </main>
    </>
  );
  
}

export default AllBlogs;
