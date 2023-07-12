import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row } from "antd";
// import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import BlogCard from "../components/BlogCard";

const UserProfile = (props) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [user, setUser] = useState();
  const [userBlogs, setUserBlogs] = useState([]);
  const [userEdit, setUserEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    const publicFolder = "http://localhost:5000/image/";
    const getUser = async () => {
      console.log(path);
      const res = await axios.get(`/user/${path}`);
      const res_user = res["data"];
      console.log("Page User:", res["data"]);
      setUser(res_user);
      setUsername(res_user.username);
      setEmail(res_user.email);
      setPreviewImage(publicFolder + res_user.image);
      setImage(publicFolder + res_user.image);
    };

    const getUserBlogs = async () => {
      const res = await axios.get(`/profile/${path}/blogs`);
      console.log("Profile Blogs:", res["data"]);
      setUserBlogs(res["data"]);
    };

    getUser();
    getUserBlogs();
  }, [path, setUser, setEmail, setUsername, setPreviewImage, setImage, setUserBlogs]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value)
    console.log(username)
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value)
    console.log(email)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(imageFile);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updated_user = {
      username: username,
      email: email,
      password: password,
      image: image,
    };
    console.log(updated_user);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${props.token}`,
      },
    };
    axios.put(`/user/${path}`, updated_user, config).then((response) => {
      console.log(response.data);
      // window.location.replace(`/user/${user._id}`);
    }).catch((err) => console.log(err))
  };

  return (
    <>{user && 
      <>
      <div className="profile-header">
        <div className="profile-img">
          {/* <img src="https://joesch.moe/api/v1/jacques" alt="Profile" /> */}
        </div>
        <div className="profile-nav-info">
          <h3 className="user-name">{user.username}</h3>
          <div className="user-email">{user.email}</div>
        </div>
        {/* <div className="profile-option">
          {userEdit ? (
            <CloseCircleOutlined
              onClick={() => {
                setUserEdit(!userEdit);
              }}
            />
          ) : (
            <EditOutlined
              onClick={() => {
                setUserEdit(!userEdit);
              }}
            />
          )}
        </div> */}
      </div>
      {userEdit ? (
        <div className="user-form" style={{ margin: "0" }}>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required="required"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required="required"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required="required"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image-upload">Profile Picture</label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="preview-container">
                {previewImage && (
                  <img src={previewImage} alt="Blog Thumbnail" />
                )}
              </div>
            </div>
            <div className="form-group flex-row">
              <button onClick={onSubmit} style={{ width: "40%" }}>
                Update
              </button>
              <button
                style={{ width: "40%", background: "#4285f4" }}
                onClick={() => {
                  setUserEdit(!userEdit);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="blogs">
          <Row gutter={[16, 24]}>
            {userBlogs.map((blog) => (
              <Col span={8} key={blog._id}>
                <BlogCard data={blog} />
              </Col>
            ))}
          </Row>
        </div>
      )}
            
</>}</>
  );
};

export default UserProfile;