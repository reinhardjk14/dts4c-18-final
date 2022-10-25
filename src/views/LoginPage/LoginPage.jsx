import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { signIn } from "../../components/signin";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";

function LoginPage() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    const { value, name } = e.target;
    const form = {
      email: formLogin.email,
      password: formLogin.password,
    };
    form[name] = value;
    setFormLogin(form);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await signIn(formLogin.email, formLogin.password);
    console.log(response);
    if (response.message == "Firebase: Error (auth/wrong-password).") {
      Swal.fire("Wrong password");
    } else if (response.message == "Firebase: Error (auth/user-not-found).") {
      Swal.fire("Email not registered, please register first");
      navigate("/register");
    } else {
      Swal.fire("Successfully logged in");
      setUser(response.accessToken);
      navigate("/");
    }
  };
  return (
    <Form onSubmit={loginHandler} className="mt-3 ms-6 w-25 container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={formHandler}
          name="email"
          type="email"
          placeholder="Enter email"
          value={formLogin.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={formHandler}
          name="password"
          type="password"
          placeholder="Password"
          value={formLogin.password}
        />
      </Form.Group>
      <div>
        <Link to="/register">Don't have an account? Please register</Link>
      </div>
      <Button variant="dark" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}

export default LoginPage;
