import React, { useState } from "react";
import {
  CloseCircleFilled,
  EditOutlined,
  CheckOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import moment from "moment";
import { Input, Tooltip, notification } from "antd";
import { useAxiosCallback } from "../../../utils/useFetch";
import { DELETE_NOTE, EDIT_NOTE} from "../../../constants/ApiConstants";

const { TextArea } = Input;

function NotesCard({ note, onDelete }) {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };
  const handleMouseOut = () => {
    setHover(false);
  };

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(note.title);

  const { isLoading: editLoading, callback: editNote } = useAxiosCallback();

  const {isLoading: deleteLoading, callback: deleteNote } = useAxiosCallback();

  const handleSubmit = () => {
    if (title !== note.title) {
      editNote({
        method: "patch",
        url: EDIT_NOTE,
        params: { id: note._id },
        data: { title },
        success: (res) => {
          setEdit(false);
        },
        error: () => {
          setTitle(note.title);
        },
      });
    } else setEdit(false);
  };
  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = () => {
    deleteNote({
      method: "delete",
      url: DELETE_NOTE,
      params: { id: note._id },
      success: (res) => {
        notification.success({
          message: res.message,
        });

        onDelete(res.note);
      },
    });
  };
  return (
    <div className={`${edit ? "todo-card no-scale" : "todo-card"}`}>
      <div
        className="todo-body"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className={`${hover ? "todo-delete visible" : "todo-delete"}`}>
          {deleteLoading? <LoadingOutlined className="close-cta" />: <CloseCircleFilled onClick={handleDelete} className="close-cta" />}
        </div>
        <span className="todo-heading">
          {edit ? (
            <TextArea
              autoFocus={edit}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h3>{title}</h3>
          )}
        </span>
      </div>

      <div className="todo-footer">
        <div className="todo-timestamp">
          {moment(note.createdAt).format("DD-MM-YY h:mm A")}
        </div>

        <div className="todo-list-ops">
          {edit ? (
            <Tooltip
              placement="bottom"
              title={"Done"}
              color="#303030"
              mouseEnterDelay={1}
              arrow={true}
            >
              {editLoading ? <LoadingOutlined className="function-icon" /> : <CheckOutlined onClick={handleSubmit} className="function-icon" />}
            </Tooltip>
          ) : (
            <Tooltip
              placement="bottom"
              title={"Edit"}
              color="#303030"
              mouseEnterDelay={1}
              arrow={true}
            >
              <EditOutlined onClick={handleEdit} className="function-icon" />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
