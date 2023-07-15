import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate("/");
      toast.success("logged out succesfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <header>
      <Navbar bg="secondary" varient="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer style={{ color: "white" }} to="/">
            <Navbar.Brand>MERN.auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            style={{ color: "white" }}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse style={{ color: "white" }} id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown style={{ color: "white" }} title={userInfo.name}>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer style={{ color: "white" }} to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer style={{ color: "white" }} to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
