import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import thumb from "../assets/images/thumbnail.jpg";

const { Meta } = Card;
const BlogCard = (props) => {
  const publicFolder = "http://localhost:5000/image/";

  return (
    <Link to={`/blog/${props.data._id}`} className="no-link">
      <Card
        style={{
          fontFamily: "Inter",
          cursor: "Pointer",
        }}
        cover={
          <img src={props.data.image ? publicFolder + props.data.image : thumb} alt="Thumbnail" />

        }
      >
        <Meta
          avatar={<Avatar src="https://joesch.moe/api/v1/jean" />}
          title={props.data.title}
          description={`${props.data.content.substring(0, 40)} ...`}
        />
      </Card>
    </Link>
  );
};

export default BlogCard;