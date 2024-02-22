
import '../Styles/Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { isBlogger, isAuthenticated, logout } from '../utils/TokenUtil';
import { useNavigate } from 'react-router-dom';
import { NavDropdown, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CustomNavbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (!isBlogger()) {
      navigate('/user-profile');
    } else {
      navigate('/blogger-profile');
    }
  };


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar w-100" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src="Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="me-2 navbar-links">
            

            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link className="navlink">HOME</Nav.Link>
              </LinkContainer>

              {isBlogger() && (
                <LinkContainer to="/my-blogs">
                  <Nav.Link className="navlink">MY BLOGS</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/all-bloggers">
                <Nav.Link className="navlink">BLOGGERS</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/all-blogs">
                <Nav.Link className="navlink">ALL BLOGS</Nav.Link>
              </LinkContainer>

              <NavDropdown title="ABOUT" id="about-dropdown" 
              className={`navlink ${window.location.pathname.includes('/about-us') || window.location.pathname.includes('/contact-us') ? 'active' : ''}`}>
                <LinkContainer to="/about-us">
                  <NavDropdown.Item >About Us</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/contact-us">
                  <NavDropdown.Item >Contact Us</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
           
              <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} id="profile-dropdown">
              {!isAuthenticated() ? (
                <>
                    <LinkContainer to="/log-in">
                      <NavDropdown.Item>Log In</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/blogger-signup">
                      <NavDropdown.Item>SignUp-Blogger</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/user-signup">
                      <NavDropdown.Item>SignUp-User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin-log-in">
                      <NavDropdown.Item>Admin</NavDropdown.Item>
                    </LinkContainer>
                  

                </>
              ) : (
                <>
                    
                      <NavDropdown.Item onClick={handleProfileClick}>
                        Profile
                      </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogOutClick}>
                      Log Out
                    </NavDropdown.Item>
                </>
              )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  );
}



export default CustomNavbar;








































// import './Navbar.css';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import { LinkContainer } from 'react-router-bootstrap';
// import { isBlogger, isAuthenticated, logout } from '../utils/TokenUtil';
// import { useNavigate } from 'react-router-dom';
// import { NavDropdown, Navbar } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

// const CustomNavbar = ({ title }) => {
//   const navigate = useNavigate();

//   const handleLogOutClick = () => {
//     logout();
//     navigate('/');
//   };

//   const handleAdminDashBoard = () => {
//     navigate('/admin-dashboard')
//   }

//   const handleProfileClick = () => {
//     if (!isBlogger()) {
//       navigate('/user-profile');
//     } else {
//       navigate('/blogger-profile');
//     }
//   };
//   return (
//     <>
//       <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar w-100" bg="dark" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="/">
//             <img src="Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav" className="me-2 navbar-links">
            

//             <Nav className="me-auto">
//               <LinkContainer to="/">
//                 <Nav.Link className="navlink">HOME</Nav.Link>
//               </LinkContainer>

//               {isBlogger() && (
//                 <LinkContainer to="/my-blogs">
//                   <Nav.Link className="navlink">MY BLOGS</Nav.Link>
//                 </LinkContainer>
//               )}

//               <LinkContainer to="/all-bloggers">
//                 <Nav.Link className="navlink">BLOGGERS</Nav.Link>
//               </LinkContainer>

//               <LinkContainer to="/all-blogs">
//                 <Nav.Link className="navlink">ALL BLOGS</Nav.Link>
//               </LinkContainer>

//               <NavDropdown title="ABOUT" id="about-dropdown" 
//               className={`navlink ${window.location.pathname.includes('/about-us') || window.location.pathname.includes('/contact-us') ? 'active' : ''}`}>
//                 <LinkContainer to="/about-us">
//                   <NavDropdown.Item >About Us</NavDropdown.Item>
//                 </LinkContainer>
//                 <LinkContainer to="/contact-us">
//                   <NavDropdown.Item >Contact Us</NavDropdown.Item>
//                 </LinkContainer>
//               </NavDropdown>
//             </Nav>

//             <Nav>
//               {!isAuthenticated() ? (
//                 <>
//                   <NavDropdown title={<FontAwesomeIcon icon={faUser}  
//                   className ={`profile-icon navlink 
//                   ${window.location.pathname.includes('/log-in') 
//                   || window.location.pathname.includes('/blogger-register') 
//                   || window.location.pathname.includes('/sign-up') 
//                   || window.location.pathname.includes('/admin-log-in') 
//                   ? 'active' : ''}`}size="lg" color="white" />} id="profile-dropdown">
//                     <LinkContainer to="/log-in">
//                       <NavDropdown.Item>Log In</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/blogger-register">
//                       <NavDropdown.Item>SignUp-Blogger</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/sign-up">
//                       <NavDropdown.Item>SignUp-User</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/admin-log-in">
//                       <NavDropdown.Item>Admin</NavDropdown.Item>
//                     </LinkContainer>
//                   </NavDropdown>




//                   <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} id="profile-dropdown">
//                     <LinkContainer to="/log-in">
//                       <NavDropdown.Item>Log In</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/blogger-register">
//                       <NavDropdown.Item>SignUp-Blogger</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/sign-up">
//                       <NavDropdown.Item>SignUp-User</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/admin-log-in">
//                       <NavDropdown.Item>Admin</NavDropdown.Item>
//                     </LinkContainer>
//                   </NavDropdown>

//                 </>
//               ) : (
//                 <>
//                   <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} id="profile-dropdown">
//                     {sessionStorage.getItem("adminMessage") !== "secret" ? (
//                       <NavDropdown.Item onClick={handleProfileClick}>
//                         Profile
//                       </NavDropdown.Item>
//                     ) : null}
//                     {sessionStorage.getItem("adminMessage") === "secret" ? (
//                       <NavDropdown.Item onClick={handleAdminDashBoard}>
//                         Admin DashBoard
//                       </NavDropdown.Item>
//                     ) : null
//                     }
//                     <NavDropdown.Item onClick={handleLogOutClick}>
//                       Log Out
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>


//     </>
//   );
// }



// export default CustomNavbar;