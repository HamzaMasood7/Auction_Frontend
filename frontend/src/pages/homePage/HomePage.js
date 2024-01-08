import React from "react";
import { NavbarComponent } from "../../components/navbar/Navbar";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const backgroundImageStyle = {
    backgroundImage: `url('https://cdn.corporatefinanceinstitute.com/assets/dutch-auction.png')`, // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={backgroundImageStyle}>
      <NavbarComponent />

      <Container className="text-center mt-5">
        <h1 className="text-black display-1">Welcome to Auctioniore</h1>

        <div className="mt-4">
          <Link to="/login">
            <Button variant="primary" size="lg" className=" m-3">
              Buy
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="success" size="lg" className="m-3">
              Sell
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
