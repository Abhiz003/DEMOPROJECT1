import React, { useState } from 'react';
import './AddBlog.css';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const AddBlog = () => {
  const navigate = useNavigate();
  const initialBlogData = {
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    photoUrl: '', 
    membersNum: '',
    cost: '',
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

    try {
      const formDataForUpload = new FormData();

      Object.keys(blogData).forEach((key) => {
        if (key !== 'photoUrl') {
          formDataForUpload.append(key, blogData[key]);
        }
      });

      formDataForUpload.append('photoUrl', blogData.photoUrl);

      const result = await axios.post('http://localhost:8080/blogs/add-blog', formDataForUpload);
      console.log('Blog added successfully:', result.data);

      setBlogData(initialBlogData);
      alert('Blog added successfully');
      navigate('/all-blogs');
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
      <div className="add-exhibition-container">
        <h2 className="add-exhibition-title">Add Blog</h2>
        <p>Share your Travel experience</p>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={blogData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={blogData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={blogData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload Images:
              </label>
              <input
                type="file"
                className="form-control"
                id="formFile"
                name="photoUrl"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="members">Members:</label>
            <input
              type="number"
              id="members"
              name="members"
              value={blogData.members}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost">Total cost:</label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={blogData.cost}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="transportationMode">Transportation:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="transportationMode"
              value={blogData.transportationMode}
              onChange={handleChange}
            >
              <option defaultValue>Select</option>
              <option value="By Road">By Road</option>
              <option value="By Railway">By Railway</option>
              <option value="By Air">By Air</option>
            </select>
          </div>
          <button type="submit" className="add-exhibition-button">
            Submit
          </button>{' '}
          <button type="reset" className="add-exhibition-button">
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;





























// import React, { useState } from 'react';
// import AdminNavbar  from './AdminNavbar';
// import './AddBlog.css';
// import { useNavigate } from 'react-router-dom';

// const AddBlog = ({ history }) => {
//     const navigate = useNavigate();
//   const [blogData, setBlogData] = useState({
//     title: '',
//     date: '',
//     venue: '',
//     description: '',
//     image: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8080/api/exhibitions/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(blogData),
//       });
//       console.log(response);

//       navigate('/admin/all-blogs');
//     } catch (error) {
//       console.error('Error adding blog:', error);
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="add-exhibition-container">
//         <h2 className="add-exhibition-title">Add Blog</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="title">Title:</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={blogData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="date">Date:</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={blogData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="venue">Venue:</label>
//             <input
//               type="text"
//               id="venue"
//               name="venue"
//               value={blogData.venue}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               name="description"
//               value={blogData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="image">Image URL:</label>
//             <input
//               type="url"
//               id="image"
//               name="image"
//               value={blogData.image}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="add-exhibition-button">
//             Submit
//           </button>{' '}
//           <button onClick={() => navigate('/admin-exhibitions')} className="add-exhibition-button">
//             Back
//           </button>

//         </form>
//       </div>
//     </>
//   );
// };

// export default AddBlog;
