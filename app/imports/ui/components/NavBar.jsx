import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PencilSquare, BoxArrowRight, PersonFill, PersonPlusFill, PlusSquare } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser, loggedIn } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);
  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = loggedIn ? 'bg-black' : 'bg-black';
  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px', color: 'white' }}>Envision Lahaina</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              <NavDropdown title="Civic Engagement" className="white-text-dropdown">
                <NavDropdown.Item as={NavLink} to="/forum">
                  <Nav.Link as={NavLink} to="/forum" key="forum" style={{ color: 'black' }}>Forum</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/survey">
                  <Nav.Link as={NavLink} to="/survey" key="survey" style={{ color: 'black' }}>Survey</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/community">
                  <Nav.Link as={NavLink} to="/community" key="community" style={{ color: 'black' }}>Community</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : ''}
            {currentUser ? (
              <NavDropdown title="Visualize Toolset" className="white-text-dropdown">
                <NavDropdown.Item as={NavLink} to="/model">
                  <Nav.Link as={NavLink} to="/model" key="model" style={{ color: 'black' }}>Model</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/dalle3">
                  <Nav.Link as={NavLink} to="/dalle3" key="dalle" style={{ color: 'black' }}>Dall-E3</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/mapping">
                  <Nav.Link as={NavLink} to="/mapping" key="gis" style={{ color: 'black' }}>Gis-Map</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/external">
                  <Nav.Link as={NavLink} to="/external" key="external" style={{ color: 'black' }}>External</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : ''}
          </Nav>

          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown title="Login" className="white-text-dropdown">
                <NavDropdown.Item as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title={currentUser} className="white-text-dropdown">
                <NavDropdown.Item as={NavLink} to="/addprofile">
                  <PlusSquare />
                  {' '}
                  Add
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/editprofile">
                  <PencilSquare />
                  {' '}
                  Edit
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
