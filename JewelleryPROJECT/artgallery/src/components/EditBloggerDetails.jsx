import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import { getBloggerDetails, updateBlogger } from '../Services/UserService';
import { useNavigate, useParams } from 'react-router-dom';

const EditBloggerDetails = () => {
  const newid = sessionStorage.getItem('userId');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bloggerName: '',
    bloggerEmail: '',
    bloggerPhone: '',
    profilePic: '',
    bloggerDescription: '',
  });
  const [updateMessage, setUpdateMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [signUpError, setSignUpError] = useState(false);

  useEffect(() => {
    const fetchBloggerDetails = async () => {
      try {
        const bloggerDetails = await getBloggerDetails(newid);
        setFormData(bloggerDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBloggerDetails();
  }, [newid]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case 'bloggerName':
        errors.bloggerName = /^[A-Za-z\s]+$/.test(value) ? '' : 'Name should contain only letters and spaces';
        break;
      case 'bloggerPhone':
        errors.bloggerPhone = /^[0-9]{10}$/.test(value) ? '' : 'Phone should contain exactly 10 numbers';
        break;
      case 'bloggerEmail':
        errors.bloggerEmail = /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email address';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (Object.values(formErrors).some((error) => error !== '')) {
    return;
  }

  setUpdateMessage('Updating blogger details...');

  try {
    const formDataForUpload = new FormData();

    // Append user ID to the form data
    formDataForUpload.append('bloggerId', newid);

    Object.keys(formData).forEach((key) => {
      formDataForUpload.append(key, formData[key]);
    });

    const result = await updateBlogger(formDataForUpload);

    if (result.status === true) {
      setUpdateMessage('Blogger details updated successfully.');
      setTimeout(() => {
        navigate('/blogger-profile');
      }, 1000);
    } else {
      setUpdateMessage(result.statusMessage || 'Failed to update blogger details.');
    }
  } catch (error) {
    console.log(error);
    setUpdateMessage('Error updating blogger details.');
  } finally {
    // You can clear the message after a certain time if needed
    setTimeout(() => {
      setUpdateMessage('');
    }, 5000);
  }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (Object.values(formErrors).some((error) => error !== '')) {
  //     return;
  //   }

  //   try {
  //     const formDataForUpload = new FormData();

  //     Object.keys(formData).forEach((key) => {
  //       formDataForUpload.append(key, formData[key]);
  //     });

  //     const result = await updateBlogger(formDataForUpload);

  //     if (result.status === true) {
  //       alert(result.statusMessage || 'Blogger details updated successfully.');
  //       navigate('/blogger-profile');
  //     } else {
  //       alert(result.statusMessage || 'Failed to update blogger details.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setSignUpError(true);
  //     setTimeout(() => {
  //       setSignUpError(false);
  //     }, 1000);
  //   }
  // };

  return (
    <>
     <CustomNavbar />
      <Container>
        <h2 className="mt-5 text-center">Edit Blogger Details</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Blogger Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter Blogger Name"
              name="bloggerName"
              value={formData.bloggerName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Blogger Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Enter Blogger Email"
              name="bloggerEmail"
              value={formData.bloggerEmail}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Blogger Phone</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter Blogger Phone"
              name="bloggerPhone"
              value={formData.bloggerPhone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" name="profilePic" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Blogger Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Blogger Description"
              name="bloggerDescription"
              value={formData.bloggerDescription}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </>
  );

























  // const newid = sessionStorage.getItem('userId');
  // const navigate = useNavigate();
  // const { bloggerId } = useParams();

  // const [formData, setFormData] = useState({
  //   bloggerName: '',
  //   bloggerEmail: '',
  //   bloggerPhone: '',
  //   bloggerPassword: '',
  //   profilePic: '',
  //   artworksCreated: '',
  //   prizesWon: '',
  //   blogsViewed: '',
  //   artStyle: '',
  // });

  // const [formErrors, setFormErrors] = useState({});
  // const [signUpError, setSignUpError] = useState(false);

  // useEffect(() => {
  //   const fetchBloggerDetails = async () => {
  //     try {
  //       const bloggerDetails = await getBloggerDetails(newid);
  //       setFormData(bloggerDetails);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchBloggerDetails();
  // }, [bloggerId]);

  // const handleChange = (e) => {
  //   const { name, value, type } = e.target;

  //   if (type === 'file') {
  //     setFormData({ ...formData, [name]: e.target.files[0] });
  //   } else {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (Object.values(formErrors).some((error) => error !== '')) {
  //     return;
  //   }
  //   sessionStorage.setItem('userName', formData.bloggerName);
  //   sessionStorage.setItem('userEmail', formData.bloggerEmail);
  //   navigate('/blogger-profile');
  //   try {
  //     const formDataForUpload = new FormData();

  //     Object.keys(formData).forEach((key) => {
  //       if (key !== 'profilePic') {
  //         formDataForUpload.append(key, formData[key]);
  //       }
  //     });

  //     if (formData.profilePic) {
  //       formDataForUpload.append('profilePic', formData.profilePic);
  //     }

  //     const result = await updateBlogger(formDataForUpload);

  //     console.log('Response Data:', result);

  //     if (result.status === true) {
  //       alert(result.statusMessage || 'Blogger details updated successfully.');
  //       navigate('/blogger-profile');
  //     } else {
  //       alert(result.statusMessage || 'Failed to update blogger details.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setSignUpError(true);
  //     setTimeout(() => {
  //       setSignUpError(false);
  //     }, 2000);
  //   }
  // }; 

  // return (
  //   <>
  //     <CustomNavbar />
  //     <Container>
  //       <h2 className="mt-5 text-center">Edit Blogger Details</h2>
  //       <Form onSubmit={handleSubmit}>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Blogger Name</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 required
  //                 placeholder="Enter Blogger Name"
  //                 name="bloggerName"
  //                 value={formData.bloggerName}
  //                 onChange={handleChange}
  //               />
  //               {formErrors.bloggerName && <Alert variant="danger" className="mt-2">{formErrors.bloggerName}</Alert>}
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Blogger Email</Form.Label>
  //               <Form.Control
  //                 type="email"
  //                 required
  //                 placeholder="Enter Blogger Email"
  //                 name="bloggerEmail"
  //                 value={formData.bloggerEmail}
  //                 onChange={handleChange}
  //               />
  //               {formErrors.bloggerEmail && <Alert variant="danger" className="mt-2">{formErrors.bloggerEmail}</Alert>}
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Blogger Phone</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 required
  //                 placeholder="Enter Blogger Phone"
  //                 name="bloggerPhone"
  //                 value={formData.bloggerPhone}
  //                 onChange={handleChange}
  //               />
  //               {formErrors.bloggerPhone && <Alert variant="danger" className="mt-2">{formErrors.bloggerPhone}</Alert>}
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Password</Form.Label>
  //               <Form.Control
  //                 type="password"
  //                 required
  //                 placeholder="Enter Password"
  //                 name="bloggerPassword"
  //                 value={formData.bloggerPassword}
  //                 onChange={handleChange}
  //               />
  //               {formErrors.bloggerPassword && <Alert variant="danger" className="mt-2">{formErrors.bloggerPassword}</Alert>}
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Profile Picture</Form.Label>
  //               <Form.Control type="file" name="profilePic" onChange={handleChange} />
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Artworks Created</Form.Label>
  //               <Form.Control
  //                 type="number"
  //                 placeholder="Enter Number of Artworks Created"
  //                 name="artworksCreated"
  //                 value={formData.artworksCreated}
  //                 onChange={handleChange}
  //               />
  //               {formErrors.artworksCreated && <Alert variant="danger" className="mt-2">{formErrors.artworksCreated}</Alert>}
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Prizes Won</Form.Label>
  //               <Form.Control
  //                 type="number"
  //                 placeholder="Enter Number of Prizes Won"
  //                 name="prizesWon"
  //                 value={formData.prizesWon}
  //                 onChange={handleChange}
  //               />
  //               {formErrors.prizesWon && <Alert variant="danger" className="mt-2">{formErrors.prizesWon}</Alert>}
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Blogs Viewed</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="Enter Blogs Viewed"
  //                 name="blogsViewed"
  //                 value={formData.blogsViewed}
  //                 onChange={handleChange}
  //               />
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center">
  //           <Col lg={6}>
  //             <Form.Group className="mb-3">
  //               <Form.Label>Art Style</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="Enter Art Style"
  //                 name="artStyle"
  //                 value={formData.artStyle}
  //                 onChange={handleChange}
  //               />
  //             </Form.Group>
  //           </Col>
  //         </Row>
  //         <Row className="justify-content-center mt-3">
  //           <Col lg={2}>
  //             <Button variant="primary" type="submit">
  //               Update
  //             </Button>{' '}
  //             <Button variant="primary" onClick={() => navigate('/blogger-profile')}>
  //               Back
  //             </Button>
  //           </Col>
  //         </Row>
  //       </Form>
  //     </Container>
  //   </>
  // );
};

export default EditBloggerDetails;
