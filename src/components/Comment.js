import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CloseCircleOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Avatar, Space, Popconfirm } from "antd";

const Comment = (props) => {
  const [userId, setUserId] = useState();
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(props.comment.body);
  const config = { headers: { Authorization: `Bearer ${props.token}` } };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = async () => {
    const updated_comment = { body: comment };
    await axios.put(
      `/blogs/${props.blog_id}/comments/${props.comment._id}`,
      updated_comment,
      config
    );
    setEdit(!edit);
    window.location.replace(`/blog/${props.blog_id}`);
  };

  const handleDelete = async () => {
    await axios.delete(
      `/blogs/${props.blog_id}/comments/${props.comment._id}`,
      config
    );
    window.location.replace(`/blog/${props.blog_id}`);
  };

  return (
    <div
      style={{ padding: "10px 0px", alignItems: "center" }}
      className="flex-row"
    >
      <Avatar src="https://joesch.moe/api/v1/jacques" size="large" />
      <div
        style={{
          margin: "0px 10px",
          backgroundColor: "#f0f2f5",
          padding: "5px 20px",
          borderRadius: "5px",
        }}
      >
        {edit ? (
          <div className="flex-row">
            <Input value={comment} onChange={handleChange} />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleComment}
              style={{ marginLeft: "20px" }}
            />
          </div>
        ) : (
          <>
            <div className="flex-row" style={{ alignItems: "center" }}>
              <div className="comment-author">
                {props.comment.commenterName}
              </div>
              {userId === props.comment.commenter_id._id ? (
                <Space>
                  <EditOutlined onClick={handleEdit} />
                  <Popconfirm
                    title="Are you sure to delete this comment?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </Space>
              ) : null}
            </div>
            <div className="comment-body">{props.comment.body}</div>
          </>
        )}
      </div>
      {edit ? <CloseCircleOutlined onClick={handleEdit} /> : null}
    </div>
  );
};

export default Comment;