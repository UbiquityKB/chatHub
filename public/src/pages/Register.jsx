import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (localStorage.getItem("ChatHub-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("ChatHub-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should match!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should contain at least 3 characters!",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email should not be blank!", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should contain at least 8 characters!",
        toastOptions
      );
      return false;
    } else if (!passwordRegex.test(password)) {
      toast.error(
        "Password should contain at least one uppercase letter, one lowercase letter, and one number or special character!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>ChatHub</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f5f5f5;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #fafafa;
      text-transform: none;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #333;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #f5f5f5;
      border-radius: 0.4rem;
      color: #fafafa;
      font-size: 1rem;
      margin-bottom: 1rem;
      width: 100%;
      %:focus {
        border: 0.1rem solid #f5f5f5;
        outline: none;
      }
    }
    button {
      background-color: #f5f5f5;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      color: #333;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      text-transform: none;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #6cc644;
        color: #fafafa;
      }
    }
    span {
      color: #f5f5f5;
      text-transform: none;
      a {
        color: #4078c0;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
