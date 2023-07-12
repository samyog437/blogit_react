import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Col, Row, Pagination } from "antd";
import explore from "../assets/images/explore.png";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [blogsPerPage] = useState(6);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await axios.get("blogs");
      console.log(res["data"]);
      setBlogs(res["data"]);
    };
    getBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleChangePage = (page) => setCurrentPage(page);

  return (
    <>
      <div className="text-center">
        <img src={explore} alt="explore" />
      </div>
      <Row gutter={[16, 24]}>
        {currentBlogs.map((blog) => (
          <Col span={8} key={blog._id}>
            <BlogCard data={blog} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={blogsPerPage}
        total={blogs.length}
        onChange={handleChangePage}
        style={{ margin: "2rem 0rem", textAlign: "center" }}
      />
    </>
  );
};

export default Dashboard;