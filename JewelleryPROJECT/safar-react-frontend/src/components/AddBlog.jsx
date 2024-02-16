// import React, { useState } from 'react';
// import './AddBlog.css';
// import { Button, Form } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';
// import CustomNavbar from './CustomNavbar';
// import axios from 'axios';
// import { getUserId } from '../utils/TokenUtil';



// const AddBlog = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     startDate: '',
//     endDate: '',
//     blogDescription: '',
//     photoUrl: '',
//     members: 1,
//     totalCost: 0,
//     transportationMode: 'By Road',
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === 'photoUrl' ? files[0] : value,
//     }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataForServer = new FormData();
//       for (const key in formData) {
//         formDataForServer.append(key, formData[key]);
//       }

//       formDataForServer.append('bloggerId', getUserId());
//       // formDataForServer.append('bloggerId', 1);


//       const response = await axios.post('http://localhost:8080/add-blog', formDataForServer, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log(response.data);

//     } catch (error) {
//       console.error('Error adding blog:', error.response ? error.response.data : error.message);
//       // Handle error, display error message to the user
//     }
//   };
  


//   return (
//     <>
//             <CustomNavbar />
//       <div className="add-exhibition-container">
//         <h2 className="add-exhibition-title">Add Blog</h2>
//         <p>Share your Travel experience</p>
//         <form onSubmit={handleSubmit} >
//           <Form.Group>
//             <Form.Label>Title:</Form.Label>
//             <Form.Control
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Start date:</Form.Label>
//             <Form.Control
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>End date:</Form.Label>
//             <Form.Control
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Description:</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Upload Images:</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               name="photoUrl"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Members:</Form.Label>
//             <Form.Control
//               type="number"
//               name="members"
//               value={formData.members}
//               onChange={handleChange}
//               min="1"
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Total cost:</Form.Label>
//             <Form.Control
//               type="number"
//               name="cost"
//               value={formData.cost}
//               onChange={handleChange}
//               min="0"
//               required
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Transportation:</Form.Label>
//             <Form.Control
//               as="select"
//               name="transportationMode"
//               value={formData.transportationMode}
//               onChange={handleChange}
//             >
//               <option defaultValue>Select</option>
//               <option value="By Road">By Road</option>
//               <option value="By Railway">By Railway</option>
//               <option value="By Air">By Air</option>
//             </Form.Control>
//           </Form.Group>

//           <Button type="submit" className="add-exhibition-button">
//             Submit
//           </Button>{' '}
//           <Button type="reset" className="add-exhibition-button">
//             Reset
//           </Button>
//         </form>
//       </div>
    
//     </>
//   );
// }

// export default AddBlog;





































import React, { useState } from 'react';
import './AddBlog.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';
import { getUserId } from '../utils/TokenUtil';

const AddBlog = () => {
  const navigate = useNavigate();
  const initialBlogData = {
    title: '',
    startDate: '',
    endDate: '',
    blogDescription: '',
    photoUrl: '', 
    members: '',
    totalCost: '',
    transportationMode: 'By Road'
  };

  const [blogData, setBlogData] = useState(initialBlogData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setBlogData({ ...blogData, [name]: e.target.files[0] });
    } else {
      setBlogData((prevBlog) => ({ ...prevBlog, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const startDate = new Date(blogData.startDate);
    const endDate = new Date(blogData.endDate);
  
    if (endDate < startDate) {
      alert('End date cannot be before the start date');
      return;
    }
  
    try {
      const formDataForUpload = new FormData();
  
      Object.keys(blogData).forEach((key) => {
        if (key !== 'photoUrl') {
          formDataForUpload.append(key, blogData[key]);
        }
      });
  
      formDataForUpload.append('photoUrl', blogData.photoUrl);
      formDataForUpload.append('bloggerId', getUserId());
  
      const result = await axios.post('http://localhost:8080/add-blog', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Blog added successfully:', result.data);
  
      alert('Blog added successfully');
      navigate('/my-blogs');
    } catch (error) {
      console.error('Error adding blog:', error.message);
    }
  };
  
  const handleReset = () => {
    setBlogData(initialBlogData);
  };

  return (
    <>
      <CustomNavbar />
      <div className="add-blog-container">
        <h2 className="add-blog-title text-center">Add Blog</h2>
        <p className="text-center">Share your Travel experience</p>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          {/* <input
              type="hidden"
              id="bloggerId"
              name="bloggerId"
              value={getUserId()}
              required
            /> */}
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Start date:</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={blogData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>End date:</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={blogData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="blogDescription"
              value={blogData.blogDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Upload Images:</Form.Label>
            <Form.Control
              type="file"
              name="photoUrl"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Members:</Form.Label>
            <Form.Control
              type="number"
              name="members"
              value={blogData.members}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Total cost:</Form.Label>
            <Form.Control
              type="number"
              name="totalCost"
              value={blogData.totalCost}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Transportation:</Form.Label>
            <Form.Control
              as="select"
              name="transportationMode"
              value={blogData.transportationMode}
              onChange={handleChange}
            >
              <option defaultValue>Select</option>
              <option value="By Road">By Road</option>
              <option value="By Railway">By Railway</option>
              <option value="By Air">By Air</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit" className="add-exhibition-button">
            Submit
          </Button>{' '}
          <Button type="reset" className="add-exhibition-button">
            Reset
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
