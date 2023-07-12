import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SendOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Spin,
  Avatar,
  Tooltip,
  Button,
  Col,
  Input,
  Space,
  Popconfirm,
} from "antd";
import Comment from "../components/Comment";
import BlogCard from "../components/BlogCard";
import BlogEdit from "../components/BlogEdit";
import thumb from "../assets/images/thumbnail.jpg";

const { TextArea } = Input;

const BlogPage = (props) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const publicFolder = "http://localhost:5000/image/";
  const [blog, setBlog] = useState();
  const [blogs, setBlogs] = useState([]);
  const [comment, setComment] = useState();
  const config = { headers: { Authorization: `Bearer ${props.token}` } };

  useEffect(() => {
    const getBlog = async () => {
      const res = await axios.get("/blogs/" + path);
      console.log("Current Blog:", res["data"]);
      setBlog(res["data"]);
    };
    getBlog();

    const getBlogs = async () => {
      const res = await axios.get("/blogs/");
      const new_blogs = res["data"];
      const filtered_blogs = new_blogs.filter(
        (new_blog) => new_blog._id !== blog?._id
      );
      setBlogs(filtered_blogs);
    };

    getBlogs();
  }, [path, blog?._id]);

  const handleNewComment = async () => {
    const new_comment = { body: comment };
    console.log(blog.blog_id);
    await axios.post(`/blogs/${path}/comments`, new_comment, config);
    window.location.replace(`/blog/${path}`);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleDelete = async () => {
    await axios
      .delete(`/blogs/${blog._id}`, config)
      .then(() => {
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {blog ? (
        <div className="blog-page">
          <div className="blog-left">
            <div style={{ width: "100%", height: "350px", marginTop: "40px" }}>
              <img
                src={blog.image ? publicFolder + blog.image : thumb}
                alt=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: "12px",
                }}
              />
            </div>
            <div
              className="flex-row"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div className="blog-title">{blog.title}</div>
              {props.user_id === blog.user._id ? (
                <Space>
                  <BlogEdit blog={blog} token={props.token} />
                  <Popconfirm
                    title="Are you sure to delete this blog?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </Space>
              ) : null}
            </div>
            <div
              className="blog-views"
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "10px",
                color: "gray",
              }}
            >
              {blog.view}&nbsp;Views
            </div>
            <div className="blog-content">{blog.content}</div>
            <Link to={`/user/${blog.user._id}`}>
              <div className="blog-author">
                <Avatar
                  src="https://joesch.moe/api/v1/jacques"
                  style={{ marginRight: "10px" }}
                  size="large"
                />
                {blog.user.username}
              </div>
            </Link>

            <div className="comment-section">
              <div className="new-comment flex-row">
                <TextArea
                  row={4}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={handleChange}
                />
                <Tooltip title="Comment">
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleNewComment}
                    style={{ marginLeft: "20px" }}
                  />
                </Tooltip>
              </div>
              {[...blog.comments].reverse().map((comment) => (
                <Comment
                  blog_id={blog._id}
                  comment={comment}
                  key={comment._id}
                  token={props.token}
                />
              ))}
            </div>
          </div>
          <div className="blog-right">
            <div className="blog-title">Other Blogs</div>

            {blogs.slice(0, 3).map((ind_blog) => (
              <Col key={ind_blog._id} style={{ marginTop: "20px" }}>
                <BlogCard data={ind_blog} key={ind_blog._id} />
              </Col>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default BlogPage;