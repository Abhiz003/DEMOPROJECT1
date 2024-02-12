import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import CustomNavbar from './CustomNavbar';
import { bloggerLogin, login } from '../Services/UserService.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isBlogger, setIsBlogger] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'isBlogger') {
      setIsBlogger(e.target.checked);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;

      if (isBlogger) {
        localStorage.setItem('blogger', "true");
        result = await bloggerLogin({
          bloggerEmail: formData.userEmail,
          bloggerPassword: formData.userPassword,
        });
      } else {
        result = await login(formData);
      }

      if (result.status === true) {
        sessionStorage.setItem('userName', result.name);
        sessionStorage.setItem('userEmail', result.email);
        sessionStorage.setItem('userId', result.id);
        alert(`Welcome, ${result.name}! Get ready for an exciting journey!`);
        localStorage.setItem('token', result.token);
        navigate('/');
      } else {
        alert(result.statusMessage || "Oops! It seems like you're already a member. Please Log In.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomNavbar />

      <Container>
        <div className="container d-flex justify-content-center align-items-center">
          <h1 className='mt-5'>User Login</h1>
        </div>

        <div className="container">
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-md-center mt-4">
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter Email" name="userEmail" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" name="userPassword" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col lg={4}>
                <Form.Check
                  type="checkbox"
                  label="I am a blogger"
                  name="isBlogger"
                  checked={isBlogger}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mt-3 justify-content-md-center" >
              <Col lg={1}>
                <Button variant="primary" type="submit">Log In</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}
export default Login;
























// import { Button, Col, Container, Form, Row } from 'react-bootstrap';
// import { useState } from 'react';
// import CustomNavbar from './CustomNavbar';
// import { bloggerlogin, login } from '../Services/UserService.js';
// import { useNavigate } from 'react-router-dom';

// export function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [isArtist, setIsArtist] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'isArtist') {
//       setIsArtist(e.target.checked);
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let result;

//       if (isArtist) {
//         localStorage.setItem('artist', "true");
//         result = await artistlogin({
//           artistEmail: formData.userEmail,
//           artistPassword: formData.userPassword,
//         });
//       } else {
//         result = await login(formData);
//       }


//       if (result.status === true) {
//         sessionStorage.setItem('userName', result.name);
//         sessionStorage.setItem('userEmail', result.email);
//         sessionStorage.setItem('userId', result.id);
//         alert(`Welcome, ${result.name}! Get ready for a fun art journey!`);
//         localStorage.setItem('token', result.token);
//         navigate('/');
//       } else {
//         alert(result.statusMessage || "Oops! It seems like you're already a member. Please Log In.");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <CustomNavbar />

//       <Container>
//         <div className="container d-flex justify-content-center align-items-center">
//           <h1 className='mt-5'>User Login</h1>
//         </div>

//         <div className="container">
//           <Form onSubmit={handleSubmit}>
//             <Row className="justify-content-md-center mt-4">
//               <Col lg={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control type="text" placeholder="Enter Email" name="userEmail" onChange={handleChange} />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="justify-content-md-center">
//               <Col lg={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control type="password" placeholder="Enter Password" name="userPassword" onChange={handleChange} />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="justify-content-md-center">
//               <Col lg={4}>
//                 <Form.Check
//                   type="checkbox"
//                   label="I am an artist"
//                   name="isArtist"
//                   checked={isArtist}
//                   onChange={handleChange}
//                 />
//               </Col>
//             </Row>

//             <Row className="mt-3 justify-content-md-center" >
//               <Col lg={1}>
//                 <Button variant="primary" type="submit">Log In</Button>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//       </Container>
//     </>
//   );
// }
