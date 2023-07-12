import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "../src/components/Header";

import Dashboard from "../src/pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogPage from "./pages/BlogPage";
import UserProfile from "./pages/UserProfile";
import AddBlog from "./pages/AddBlog";

function App() {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (userId == null) {
      console.log("Login to access various content");
    } else {
      const getUser = async () => {
        const res = await axios.get(`/user/${userId}`);
        console.log("Logged In User:", res["data"]);
        setUser(res["data"]);
      };
      getUser();
    }
  }, [userId]);

  return (
    <Fragment>
      <BrowserRouter>
        <Header user={user} />
        <Container style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={userId ? <Dashboard /> : <Login />} />
            <Route
              path="/register"
              element={userId ? <Dashboard /> : <Register />}
            />
            <Route
              path="/blog/:blog_id"
              element={<BlogPage token={token} user_id={userId} />}
            />
            <Route
              path="/user/:user_id"
              element={<UserProfile user={user} token={token} />}
            />
            <Route
              path="/blog/create_new"
              element={
                userId ? <AddBlog user_id={userId} token={token} /> : <Login />
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;