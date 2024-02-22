import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { isAuthenticated, logout } from '../utils/TokenUtil';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.css'


const AdminNavbar = ({title}) => {
  const navigate = useNavigate();

  const openAdminProfile = () => {
    navigate('/admin/admin-profile');
  };
  
  const handleAdminDashBoard = () => {
    navigate('/admin/admin-dashboard')
  }
  const handleLogOutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className=" navbar" style={{backgroundColor:"#638889"}} data-bs-theme="dark">
     
        <Container>
          <Navbar.Brand href="/admin-dashboard">
          <img src="Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="me-2 navbar-links">
            <Nav className="me-auto navbar-links">
              <LinkContainer to="/home">
                <Nav.Link className="navlink">Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/admin/admin-dashboard/all-users">
                <Nav.Link className="navlink">Users</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/all-bloggers">
                <Nav.Link className="navlink">Bloggers</Nav.Link>
              </LinkContainer>
             
              <LinkContainer to="/all-blogs">
                <Nav.Link className="navlink">All Blogs</Nav.Link>
              </LinkContainer>

              <NavDropdown title={"List"} 
              className={`navlink 
              ${window.location.pathname.includes('/bloggers-list') 
              || window.location.pathname.includes('/users-list') 
              ? 'active' : ''}`}  id="profile-dropdown">
                    <LinkContainer to="/admin/admin-dashboard/bloggers-list">
                      <NavDropdown.Item>Bloggers List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/admin-dashboard/users-list">
                      <NavDropdown.Item>Users List</NavDropdown.Item>
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
                    <LinkContainer to="/signup">
                      <NavDropdown.Item>SignUp-User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin-log-in">
                      <NavDropdown.Item>Admin</NavDropdown.Item>
                    </LinkContainer>
                 
                </>
              ) : (
                <>

                  <NavDropdown.Item onClick={openAdminProfile}>
                      Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleAdminDashBoard}>
                      Admin DashBoard 
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

export default AdminNavbar;








































// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { LinkContainer } from 'react-router-bootstrap';
// import { isAuthenticated, logout } from '../utils/TokenUtil';
// import { useNavigate } from 'react-router-dom';
// import { NavDropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import './Navbar.css'



// const AdminNavbar = ({title}) => {
//   const navigate = useNavigate();

//   const handleLogOutClick = () => {
//     logout();
//     navigate('/');
//   };

//   const handleProfileClick = () => {
//       isAdmin()  && navigate('/admin-profile');
//   };


//   return (
//     <>
//       <Navbar collapseOnSelect expand="lg" className=" navbar" style={{backgroundColor:"#638889"}} data-bs-theme="dark">
     
//         <Container>
//           <Navbar.Brand href="/admin-dashboard">
//           <img src="Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav" className="me-2 navbar-links">
//             <Nav className="me-auto navbar-links">
//               <LinkContainer to="/admin-dashboard">
//                 <Nav.Link className="navlink">Home</Nav.Link>
//               </LinkContainer>

//               <LinkContainer to="/all-users">
//                 <Nav.Link className="navlink">Users</Nav.Link>
//               </LinkContainer>

//               <LinkContainer to="/all-bloggers">
//                 <Nav.Link className="navlink">Bloggers</Nav.Link>
//               </LinkContainer>
             
//               <LinkContainer to="/all-blogs">
//                 <Nav.Link className="navlink">All Blogs</Nav.Link>
//               </LinkContainer>

//               <NavDropdown title={"List"} 
//               className={`navlink 
//               ${window.location.pathname.includes('/bloggers-list') 
//               || window.location.pathname.includes('/users-list') 
//               ? 'active' : ''}`}  id="profile-dropdown">
//                     <LinkContainer to="/bloggers-list">
//                       <NavDropdown.Item>Bloggers List</NavDropdown.Item>
//                     </LinkContainer>
//                     <LinkContainer to="/users-list">
//                       <NavDropdown.Item>Users List</NavDropdown.Item>
//                     </LinkContainer>
//               </NavDropdown>

              

//             </Nav>
//             <Nav>
//               {!isAuthenticated() ? (
//                 <>
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

// export default AdminNavbar;