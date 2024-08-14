import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useAuth } from '../contexts/AuthContext';

import logo from '/logo-large.png'

export default function BasicExample() {
  const { logout, currentUser } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='d-flex align-items-center justify-content-center gap-3'>
          <Image height={40} src={logo}/>
          M&M
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/memory-lane">Memory Lane</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Action</NavDropdown.Item>
              <NavDropdown.Item href="/">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="/">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              {currentUser ?  
                <NavDropdown.Item as={'button'} onClick={handleLogout}>
                  Log out
                </NavDropdown.Item> :
                <NavDropdown.Item as={'button'} onClick={handleLogout}>
                  Log in
                </NavDropdown.Item>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
