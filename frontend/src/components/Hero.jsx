import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Hero = () => {
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
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex-flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN.auth Authentication Project</h1>
          <p className="text-center mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            nobis maiores rerum facilis dignissimos perferendis nostrum! Error
            facilis recusandae saepe commodi atque eos, vitae, impedit aliquam,
            quasi eligendi voluptatum possimus?
          </p>
          {userInfo ? (
            <div className="d-flex">
              <LinkContainer to="/profile">
                <Button className="me-3" variant="primary">
                  Profile
                </Button>
              </LinkContainer>
              <Button
                className="me-3"
                variant="secondary"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex">
              <LinkContainer to="/login">
                <Button className="me-3" variant="primary">
                  Sign In
                </Button>
              </LinkContainer>
              <LinkContainer to="/register">
                <Button className="me-3" variant="secondary">
                  Sign Up
                </Button>
              </LinkContainer>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
