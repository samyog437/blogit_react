import React, { useState } from "react";
import { Button, Modal, Divider, Input, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

const BlogEdit = (props) => {
  const { TextArea } = Input;
  const publicFolder = "http://localhost:5000/image/";
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    publicFolder + props.blog.image
  );
  const [title, setTitle] = useState(props.blog.title);
  const [content, setContent] = useState(props.blog.content);
  const [image, setImage] = useState(publicFolder + props.blog.image);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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
    const updated_blog = {
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
    axios
      .put(`/blogs/${props.blog._id}`, updated_blog, config)
      .then((response) => {
        console.log(response.data);
        window.location.replace(`/blog/${props.blog._id}`);
      });
  };

  return (
    <div>
      <EditOutlined onClick={showModal} />
      <Modal
        title={`Update Blog`}
        style={{ top: "20px" }}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Divider />
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

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="default"
              style={{ width: "30%", marginRight: "20px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ width: "30%" }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogEdit;