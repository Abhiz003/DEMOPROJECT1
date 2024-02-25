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

const AdminNavbar = ({ title, onRoleChange }) => {
  const navigate = useNavigate();

  const handleAdminDashBoard = () => {
    navigate('/admin-dashboard')
  }


  const handleLogOutClick = () => {
    logout();

    onRoleChange();
    // navigate('/home');    // set a flag to render the custom  navbar in app.js
    // window.location.reload();
  };

  const isNavLinkActive = (url) => {
    return window.location.pathname.includes(url);
  };

  const isDropdownActive = (urls) => {
    return urls.some((url) => isNavLinkActive(url));
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className=" navbar" style={{ backgroundColor: "#638889" }} data-bs-theme="dark">

        <Container>
          <Navbar.Brand href="/">
            <img src="Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="me-2">
            <Nav className="me-auto nav-links">
              <LinkContainer to="/home" isActive={() => isNavLinkActive('/home')} className="navlink">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/all-users" isActive={() => isNavLinkActive('/all-users')} className="navlink">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/all-bloggers" isActive={() => isNavLinkActive('/all-bloggers')} className="navlink">
                <Nav.Link>Bloggers</Nav.Link>
              </LinkContainer>

              <NavDropdown title={"List"}
              id="profile-dropdown"
              active={() => isDropdownActive(['/bloggers-list', '/users-list'])}
              className={`navlink ${isDropdownActive(['/bloggers-list', '/users-list']) ? 'active' : ''}`}>
                <LinkContainer to="/bloggers-list" isActive={() => isNavLinkActive('/bloggers-list')} className='navlink'>
                  <NavDropdown.Item>Bloggers List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/users-list" isActive={() => isNavLinkActive('/users-list')} className='navlink'>
                  <NavDropdown.Item>Users List</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>


              <LinkContainer to="/all-blogs" isActive={() => isNavLinkActive('/all-blogs')} className="navlink">
                <Nav.Link>All Blogs</Nav.Link>
              </LinkContainer>

              <NavDropdown 
              title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} 
              id="profile-dropdown"
              active={() => isDropdownActive(['/admin-dashboard'])}
              className={`profile-icon navlink ${isDropdownActive(['/admin-dashboard']) ? 'active' : ''}`}>

                {isAuthenticated() &&
                  <>
                    {localStorage.getItem("token") === "secret" ? (
                      <NavDropdown.Item onClick={handleAdminDashBoard}>
                        Admin DashBoard
                      </NavDropdown.Item>
                    ) : null
                    }
                    <NavDropdown.Item onClick={handleLogOutClick}>
                      Log Out
                    </NavDropdown.Item>
                  </>
                }
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
// import '../Styles/Navbar.css'

// const AdminNavbar = ({ title }) => {
//   const navigate = useNavigate();

//   const handleAdminDashBoard = () => {
//     navigate('/admin-dashboard')
//   }


//   const handleLogOutClick = () => {
//     logout();
//     navigate('/');
//     // window.location.reload();
//     // sessionStorage.clear();
//   };

//   return (
//     <>
//       <Navbar collapseOnSelect expand="lg" className=" navbar" style={{ backgroundColor: "#638889" }} data-bs-theme="dark">

//         <Container>
//           <Navbar.Brand href="/admin-dashboard">
//             <img src="Images/Logo/TheSafarLogo.png" title={title} className="logo" alt="SAFAR" />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav" className="me-2">
//             <Nav className="me-auto">
//               <LinkContainer to="/admin-dashboard">
//                 <Nav.Link>Home</Nav.Link>
//               </LinkContainer>

//               <LinkContainer to="/all-users">
//                 <Nav.Link>Users</Nav.Link>
//               </LinkContainer>

//               <LinkContainer to="/all-bloggers">
//                 <Nav.Link>Bloggers</Nav.Link>
//               </LinkContainer>

//               <NavDropdown title={"List"} className="text-dark" id="profile-dropdown">
//                 <LinkContainer to="/bloggers-list">
//                   <NavDropdown.Item className="text-dark">Bloggers List</NavDropdown.Item>
//                 </LinkContainer>
//                 <LinkContainer to="/users-list">
//                   <NavDropdown.Item>Users List</NavDropdown.Item>
//                 </LinkContainer>
//               </NavDropdown>


//               <LinkContainer to="/all-blogs">
//                 <Nav.Link>All Blogs</Nav.Link>
//               </LinkContainer>

//               <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} id="profile-dropdown">
//                 {isAuthenticated() &&
//                   <>
//                     {sessionStorage.getItem("token") === "secret" ? (
//                       <NavDropdown.Item onClick={handleAdminDashBoard}>
//                         Admin DashBoard
//                       </NavDropdown.Item>
//                     ) : null
//                     }
//                     <NavDropdown.Item onClick={handleLogOutClick}>
//                       Log Out
//                     </NavDropdown.Item>
//                   </>
//                 }
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default AdminNavbar;