import { useEffect, useState } from "react";
import "../css/home.css";
import blogService from "../services/blogService";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const getBlog = () => {
    blogService
      .getAllBlogs()
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(getBlog, []);

  return (
    <>
      <h2>Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <a href="#">
            <div className="card">
              <div className="cardimage">
                <img
                  src="https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?pid=ImgDet&rs=1"
                  alt="bolg image"
                />
              </div>
              <div className="cardtitle">{blog.title}</div>
            </div>
          </a>
        ))}
        {/* <a href="#">
          <div className="card">
            <div className="cardimage">
              <img
                src="https://th.bing.com/th/id/OIP.L51qzGCLtslIZn42Q0BFhgHaE7?pid=ImgDet&rs=1"
                alt="bolg image"
              />
            </div>
            <div className="cardtitle">This is a Title</div>
          </div>
        </a> */}
      </div>
    </>
  );
}

export default Blogs;
