// import { useState } from 'react';
import './CustomNavbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { isBlogger, isAuthenticated, logout } from '../utils/TokenUtil';
import { useNavigate } from 'react-router-dom';
import { NavDropdown, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    logout();
    navigate('/');
  };

  const handleAdminDashBoard=()=>{
    navigate('/admin-dashboard')
  }

  const handleProfileClick = () => {
    if (!isBlogger()) {  
      navigate('/user-profile');
    } else {
      navigate('/blogger-profile');
    }
  };
  return (
    <> 
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
						<img src="Images/Logo/TheSafarLogo.png" className="logo" alt="SAFAR" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="me-2">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>

              {isBlogger() && (
                <LinkContainer to="/my-blogs">
                  <Nav.Link>MY BLOGS</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/all-bloggers">
                <Nav.Link>BLOGGERS</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/all-blogs">
                <Nav.Link>ALL BLOGS</Nav.Link>
              </LinkContainer>

              <NavDropdown title="ABOUT" id="about-dropdown">
                <LinkContainer to="/about-us">
                  <NavDropdown.Item>About Us</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/contact-us">
                  <NavDropdown.Item>Contact Us</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>

            <Nav>
              {!isAuthenticated() ? (
                <>
                  <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} id="profile-dropdown">
                    <LinkContainer to="/log-in">
                      <NavDropdown.Item>Log In</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/blogger-register">
                      <NavDropdown.Item>SignUp-Blogger</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/sign-up">
                      <NavDropdown.Item>SignUp-User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin-log-in">
                      <NavDropdown.Item>Admin</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} id="profile-dropdown">
                    {sessionStorage.getItem("adminMessage") !== "secret" ?(
                      <NavDropdown.Item onClick={handleProfileClick}>
                        Profile
                      </NavDropdown.Item>
                    ) : null}
                    {sessionStorage.getItem("adminMessage") === "secret" ? (
                      <NavDropdown.Item onClick={handleAdminDashBoard}>
                        Admin DashBoard
                      </NavDropdown.Item>
                    ) : null
                    }
                    <NavDropdown.Item onClick={handleLogOutClick}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
                  

    </>
  );
}



export default CustomNavbar;