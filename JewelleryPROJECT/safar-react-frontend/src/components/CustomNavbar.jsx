// import { useState } from 'react';
import '../Styles/Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { isBlogger, isAuthenticated, logout, getUserId } from '../utils/TokenUtil';
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

  const isNavLinkActive = (url) => {
    return window.location.pathname.includes(url);
  };

  const isDropdownActive = (urls) => {
    return urls.some((url) => isNavLinkActive(url));
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar w-100" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src="/Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="me-2">
            <Nav className="me-auto nav-links">
              <LinkContainer to="/home" isActive={() => isNavLinkActive('/home')} className="navlink">
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>

              {isBlogger() && (
                <LinkContainer to={`/my-blogs/${getUserId()}`} isActive={() => isNavLinkActive('/my-blogs')} className="navlink">
                  <Nav.Link>MY BLOGS</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/all-bloggers" isActive={() => isNavLinkActive('/all-bloggers')} className="navlink">
                <Nav.Link>BLOGGERS</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/all-blogs" isActive={() => isNavLinkActive('/all-blogs')} className="navlink">
                <Nav.Link>ALL BLOGS</Nav.Link>
              </LinkContainer>

              <NavDropdown
                title="ABOUT"
                id="about-dropdown"
                active={() => isDropdownActive(['/about-us', '/contact-us'])}
                className={`navlink ${isDropdownActive(['/about-us', '/contact-us']) ? 'active' : ''}`}
              >
                <LinkContainer to="/about-us" isActive={() => isNavLinkActive('/about-us')} className="navlink">
                  <NavDropdown.Item>About Us</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/contact-us" isActive={() => isNavLinkActive('/contact-us')} className="navlink">
                  <NavDropdown.Item>Contact Us</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown
                title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />}
                id="profile-dropdown"
                active={() => isDropdownActive(['/log-in', '/blogger-register', '/user-register', '/admin-log-in', '/blogger-profile', '/user-profile'])}
                className={`profile-icon navlink ${isDropdownActive(['/log-in', '/blogger-register', '/user-register', '/admin-log-in', '/blogger-profile', '/user-profile']) ? 'active' : ''}`}
              >
                {!isAuthenticated() ? (
                  <>
                    <LinkContainer to="/log-in" isActive={() => isNavLinkActive('/log-in')} className="navlink">
                      <NavDropdown.Item>Log In</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/blogger-register" isActive={() => isNavLinkActive('/blogger-register')} className="navlink">
                      <NavDropdown.Item>SignUp-Blogger</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/user-register" isActive={() => isNavLinkActive('/user-register')} className="navlink">
                      <NavDropdown.Item>SignUp-User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin-log-in" isActive={() => isNavLinkActive('/admin-log-in')} className="navlink">
                      <NavDropdown.Item>Admin</NavDropdown.Item>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    {sessionStorage.getItem("token") !== "secret" ? (
                      <LinkContainer 
                      to={isBlogger() ? '/blogger-profile' : '/user-profile'} 
                      isActive={() => isNavLinkActive(isBlogger() ? '/blogger-profile' : '/user-profile')} 
                      className="navlink">
                        <NavDropdown.Item onClick={handleProfileClick}>
                          Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                    ) : null}
                    <LinkContainer to="/log-in" isActive={() => isNavLinkActive('/log-in')} className="navlink">
                      <NavDropdown.Item onClick={handleLogOutClick}>
                        Log Out
                      </NavDropdown.Item>
                    </LinkContainer>
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



























  // const isNavLinkActive = (url) => {
  //   return window.location.pathname.includes(url);
  // };



  // return (
  //   <>
  //     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar w-100" data-bs-theme="dark">
  //       <Container>
  //         <Navbar.Brand href="/">
  //           <img src="Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
  //         </Navbar.Brand>
  //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //         <Navbar.Collapse id="responsive-navbar-nav" className="me-2">
  //           <Nav className="me-auto nav-links">

  //             {/* <LinkContainer to="/">
  //               <Nav.Link>HOME</Nav.Link>
  //             </LinkContainer>

  //             {isBlogger() && ( 
  //               // <LinkContainer to={`/my-blogs/${getUserId()}`}>
  //               <LinkContainer to='/my-blogs'>
  //                 <Nav.Link>MY BLOGS</Nav.Link>
  //               </LinkContainer>
  //             )}

  //             <LinkContainer to="/all-bloggers">
  //               <Nav.Link>BLOGGERS</Nav.Link>
  //             </LinkContainer>

  //             <LinkContainer to="/all-blogs">
  //               <Nav.Link>ALL BLOGS</Nav.Link>
  //             </LinkContainer>

  //             <NavDropdown title="ABOUT" id="about-dropdown">
  //               <LinkContainer to="/about-us">
  //                 <NavDropdown.Item>About Us</NavDropdown.Item>
  //               </LinkContainer>
  //               <LinkContainer to="/contact-us">
  //                 <NavDropdown.Item>Contact Us</NavDropdown.Item>
  //               </LinkContainer>
  //             </NavDropdown> */}





  //             <LinkContainer to="/home" isActive={() => isNavLinkActive('/home')} className="navlink">
  //               <Nav.Link>HOME</Nav.Link>
  //             </LinkContainer>

  //             {isBlogger() && (
  //               <LinkContainer to='/my-blogs' isActive={() => isNavLinkActive('/my-blogs')} className="navlink">
  //                 <Nav.Link>MY BLOGS</Nav.Link>
  //               </LinkContainer>
  //             )}

  //             <LinkContainer to="/all-bloggers" isActive={() => isNavLinkActive('/all-bloggers')} className="navlink">
  //               <Nav.Link>BLOGGERS</Nav.Link>
  //             </LinkContainer>

  //             <LinkContainer to="/all-blogs" isActive={() => isNavLinkActive('/all-blogs')} className="navlink">
  //               <Nav.Link>ALL BLOGS</Nav.Link>
  //             </LinkContainer>

  //             <NavDropdown 
  //             title="ABOUT" 
  //             id="about-dropdown" 
  //             isActive={() => 
  //             isNavLinkActive('/about-us') || isNavLinkActive('/contact-us')} 
  //             className="navlink">
  //               {/* <LinkContainer to="/about-us" isActive={() => isNavLinkActive('/about-us')}> */}
  //               <LinkContainer to="/about-us" isActive={() => isNavLinkActive('/about-us')} className="navlink">
  //                 <NavDropdown.Item>About Us</NavDropdown.Item>
  //               </LinkContainer>
  //               {/* <LinkContainer to="/contact-us" isActive={() => isNavLinkActive('/contact-us')}> */}
  //               <LinkContainer to="/contact-us" isActive={() => isNavLinkActive('/contact-us')} className="navlink">
  //                 <NavDropdown.Item>Contact Us</NavDropdown.Item>
  //               </LinkContainer>
  //             </NavDropdown>

  //             <NavDropdown 
  //             title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} 
  //             id="profile-dropdown" 
  //             isActive={() => isNavLinkActive('/log-in')
  //                       || isNavLinkActive('/blogger-register')
  //                       || isNavLinkActive('/user-register') 
  //                       || isNavLinkActive('/admin-log-in')} 
  //             className="navlink">

  //               {!isAuthenticated() ? (
  //                 <>
  //                   <LinkContainer to="/log-in" isActive={() => isNavLinkActive('/log-in')} className="navlink">
  //                     <NavDropdown.Item>Log In</NavDropdown.Item>
  //                   </LinkContainer>
  //                   <LinkContainer to="/blogger-register" isActive={() => isNavLinkActive('/blogger-register')} className="navlink" >
  //                     <NavDropdown.Item>SignUp-Blogger</NavDropdown.Item>
  //                   </LinkContainer>
  //                   <LinkContainer to="/user-register" isActive={() => isNavLinkActive('/user-register')} className="navlink">
  //                     <NavDropdown.Item>SignUp-User</NavDropdown.Item>
  //                   </LinkContainer>
  //                   <LinkContainer to="/admin-log-in" isActive={() => isNavLinkActive('/admin-log-in')} className="navlink">
  //                     <NavDropdown.Item>Admin</NavDropdown.Item>
  //                   </LinkContainer>

  //                 </>
  //               ) : (
  //                 <>
  //                   {sessionStorage.getItem("token") !== "secret" ? (
  //                     <NavDropdown.Item onClick={handleProfileClick}>
  //                       Profile
  //                     </NavDropdown.Item>
  //                   ) : null}

  //                   <NavDropdown.Item onClick={handleLogOutClick}>
  //                     Log Out
  //                   </NavDropdown.Item>
  //                 </>
  //               )}
  //             </NavDropdown>
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>


  //   </>
  // );
