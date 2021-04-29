import React from 'react'
import { Container, Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {

    const navStyle = {
        fontSize: '1.1rem',
        fontWeight: '500'
    }

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <NavbarBrand>
                            <h2 className='logo d-inline mx-2' >RESEARCH LAB</h2>
                        </NavbarBrand>
                    </LinkContainer>
                    <NavbarToggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto' style={navStyle} >

                            <LinkContainer to='/'>
                                <Nav.Link >Home</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/faculty'>
                                <Nav.Link>Faculty</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/publications'>
                                <Nav.Link>Publication</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/focusarea'>
                                <Nav.Link>Focus Area</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/contact'>
                                <Nav.Link>Contact</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className="fas fa-user"></i>{' '} Login
                                    </Nav.Link>
                                </LinkContainer>}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='admin'>
                                    <LinkContainer to='/admin/users'>
                                        <NavDropdown.Item>User</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/publications'>
                                        <NavDropdown.Item>Publications</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/notice'>
                                        <NavDropdown.Item>Notice</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/visitormessages'>
                                        <NavDropdown.Item>Visitor Messages</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header