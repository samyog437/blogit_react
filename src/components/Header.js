import { Link } from "react-router-dom";
import { Space } from "antd";
import { Nav, Navbar } from "react-bootstrap";
import UserMenu from "./UserMenu";

const Header = (props) => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ padding: "10px 40px", backgroundColor: "#ad5389" }}
      className="navigation-bar"
    >
      <Link to={"/"} className="no-link">
        <div className="navbar-logo">Blogit</div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="no-link" style={{ marginRight: "20px" }}>
            Home
          </Link>
          <Link to="/blog/create_new" className="no-link">
            Write a Blog
          </Link>
        </Nav>
        <Navbar.Text>
          {props.user ? (
            <UserMenu user={props.user} />
          ) : (
            <>
              <Space wrap>
                <Link to={"/login"}>
                  <button className="nav-button">Login</button>
                </Link>
                <Link to={"/register"}>
                  <button className="nav-button">Register</button>
                </Link>
              </Space>
            </>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
