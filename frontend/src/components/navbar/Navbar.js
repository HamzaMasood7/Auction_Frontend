import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";
// import Badge from "react-bootstrap/Badge";
import NavDropdown from "react-bootstrap/NavDropdown";

export const NavbarComponent = ({ cartItemCount }) => {
  const { logout } = useLogout();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {

    var username = user.name;
    var isAdmin = user && user.role === "Admin";
    var isSeller = user && user.role === "Seller";
    var isBuyer = user && user.role === "Buyer";
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="light" fixed="top" data-bs-theme="light">
        <Container>
          <Link to="/">
            <Navbar.Brand to="/">Bidding System</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link className="text-secondary p-2" to="/">
              Home
            </Link>
          </Nav>

          <Nav>
            {isAdmin ? (
              <>
                <Link className="text-secondary p-2" to="/admin">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
            {(isSeller || isAdmin) && (
              <NavDropdown title="Products">
                <NavDropdown.Item>
                  <Link to="/products/create" className="btn">
                    Create Product
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/product/all" className="btn">
                    All User Products
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {user ? (
              <>
                {/* <Link className="text-secondary p-2" to="/order">

                </Link> */}
                <Link className="text-secondary p-2" to={`/profile/${user.id}`}>
                  {username}
                </Link>
                <Nav.Link onClick={handleLogout}>logout</Nav.Link>
              </>
            ) : (
              <>
                <Link className="text-secondary p-2" to="/login">
                  Login
                </Link>
                <Link className="text-secondary p-2" to="/register">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
