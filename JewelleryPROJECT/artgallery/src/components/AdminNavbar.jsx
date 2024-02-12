import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { isBlogger, isAuthenticated, logout } from '../utils/TokenUtil';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    logout();
    navigate('/');
  };


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/admin-dashboard">
          <img src="Images/TheSafarLogo.png" className="logo" alt="SAFAR" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="me-2">
            <Nav className="me-auto">

              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/user-details">
                <Nav.Link>User List</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/blogger-list">
                <Nav.Link>Blogger List</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/deleted-user-list">
                <Nav.Link>Deactivated Users</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/deleted-blogger-list">
                <Nav.Link>Deactivated Bloggers</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/message-list">
                <Nav.Link>Messages</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/admin-exhibitions">
                <Nav.Link>All Blogs</Nav.Link>
              </LinkContainer>

            </Nav>
            <Nav>
              {!isAuthenticated() ? (
                <>
                  <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" color="white" />} id="profile-dropdown">
                    <LinkContainer to="/log-in">
                      <NavDropdown.Item>Log In</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/blogger-register">
                      <NavDropdown.Item>SignUp-Artist</NavDropdown.Item>
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

export default AdminNavbar;