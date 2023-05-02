import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import AuthHeader from "../Components/AuthHeader";
import { MD5 } from "md5-js-tools";
import "../auth.scss";

const StepTwo = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigate = useNavigate();

  const hashPassword = (password) => {
    const hash = MD5.generate(password);
    console.log({ hash });
    return hash;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const hashedPassword = hashPassword(password);
    if (password.length < 8) {
      alert("Password should be atleast 8 characters");
    } else if (!isEmailValid(email)) {
      alert("Please enter a valid email address!");
      return;
    } else {
      const login = await axios.post("http://localhost:8000/users/login", {
        username: email,
        password: hashedPassword,
      });
      console.log({ login });
      if (login.data.success) {
        const userId = login.data.userid;
        const userData = {
          userId,
        };
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        const user = await axios(`http://localhost:8000/users/${userId}`);
        localStorage.setItem("loggedUser", JSON.stringify(user.data[0]));
        if (user.status === 200) {
          navigate("/landing");
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Invalid username or password");
      }
    }
  };
  const isEmailValid = (email) => {
    // Regex pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  return (
    // <TopNavBar />
    <div className="auth-main-wrap" style={{ marginTop: "120px" }}>
      <AuthHeader title={"Welcome Back!"} />
      <Form className="mt-40">
        <div className="d-flex flex-column justify-content-center mt-40 ">
          <Form.Group className="mb-4">
            <Form.Label className="auth-label">Email</Form.Label>
            <Form.Control
              className=" p-2 auth-input-wrap"
              type="text"
              placeholder=""
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="auth-label">Password</Form.Label>
            <Form.Control
              className=" p-2 auth-input-wrap"
              type="password"
              placeholder="8 or more characters"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: "30px",
                alignItems: "center",
              }}
            >
              <p className="desc-text" style={{ marginRight: "15px" }}>
                Remember Me
              </p>
              <Form.Check
                value="Full Name"
                type="checkbox"
                checked={rememberPassword}
                onChange={() => {
                  setRememberPassword(!rememberPassword);
                }}
              />
            </div>
            <a href="/login">
              <p
                className="desc-text"
                style={{ color: "#3A86FF", marginTop: "12px" }}
              >
                Forgot Password?
              </p>
            </a>
          </Form.Group>
          <Button
            className="primary-btn"
            style={{ marginTop: "40px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default StepTwo;
