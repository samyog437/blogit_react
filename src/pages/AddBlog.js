import axios from "axios";
import React, { useState } from "react";
import { Button, Input, Form } from "antd";

const AddBlog = (props) => {
  const { TextArea } = Input;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const new_blog = {
      title,
      content,
      image,
    };
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${props.token}`,
      },
    };
    console.log("Form submitted:", title, content);
    axios.post(`/blogs/`, new_blog, config).then((response) => {
      console.log(response.data.blog._id);
      window.location.replace(`/blog/${response.data.blog._id}`);
    });
  };

  return (
    <div style={{ padding: "20px 100px" }}>
      <Form name="basic" layout="vertical" autoComplete="off">
        <Form.Item
          label="Title"
          rules={[
            {
              required: true,
              message: "Field cannot be empty!",
            },
          ]}
        >
          <Input value={title} onChange={handleTitleChange} />
        </Form.Item>

        <Form.Item
          label="Content"
          rules={[
            {
              required: true,
              message: "Field cannot be empty!",
            },
          ]}
        >
          <TextArea rows={8} value={content} onChange={handleContentChange} />
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <div>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="preview-container">
            {previewImage && <img src={previewImage} alt="Blog Thumbnail" />}
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ width: "30%" }}
          >
            Add Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBlog;