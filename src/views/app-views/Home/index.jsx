import { Button, Col, Form, Input, Row, Tooltip, notification } from "antd";
import React, { useEffect, useState } from "react";
import NotesCard from "../../../components/layout-components/NotesCard";
import { useAxiosCallback } from "../../../utils/useFetch";
import { ADD_NOTE, NOTES } from "../../../constants/ApiConstants";
import $ from "jquery";
import Loading from "../../../components/shared-components/Loading";
import { RedoOutlined } from "@ant-design/icons";

function Home(props) {
  const [form] = Form.useForm();

  const [notes, setNotes] = useState(null);

  const { isLoading: notesLoading, callback: getNotes } = useAxiosCallback();

  useEffect(() => {
    if (!notes)
      getNotes({
        method: "get",
        url: NOTES,
        success: (res) => {
          setNotes(res.notes);
        },
      });
  }, [notes]);

  const handleCardRemove = (note) => {
    let list = [...notes];
    list = list.filter((item) => item._id !== note._id);
    $(`#${note._id}`).css({
      transform: "scale(0.2)",
      opacity: 0,
    });
    setTimeout(() => {
      setNotes(list);
    }, 300);
  };

  const { isLoading, callback: addNote } = useAxiosCallback();

  const handleAddNote = () => {
    form.validateFields().then((values) => {
      const { title } = values;
      addNote({
        method: "put",
        url: ADD_NOTE,
        data: { note: title },
        success: (res) => {
          const { note, message } = res;
          notification.success({
            message: message,
          });
          const list = [note, ...notes];
          setNotes(list);
          form.resetFields();
        },
      });
    });
  };

  return (
    <>
      <div className="notes-input-container">
        <Form form={form} onFinish={handleAddNote}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name={"title"}
                rules={[
                  {
                    required: true,
                    message: "Please input a Note",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter note...."
                  className="input-list-item input-list-item-large"
                />
              </Form.Item>
            </Col>
            <Col>
              <Row gutter={24}>
                <Col>
                  <Form.Item style={{ margin: 0 }}>
                    <Button
                      loading={isLoading}
                      htmlType="submit"
                      className="btn-cta"
                    >
                      Add Note
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Tooltip
                    placement="right"
                    title={"Refresh"}
                    color="#303030"
                    mouseEnterDelay={1}
                    arrow={true}
                  >
                    <Button
                      onClick={() => setNotes(null)}
                      className="btn-cta btn-cta-icon"
                      shape="circle"
                      icon={<RedoOutlined />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
      {notes?.length ? (
        <Row gutter={[64, 48]} className="todo-card-container">
          {notes.map((item) => (
            <Col
              key={item._id}
              span={6}
              id={item._id}
              style={{ transition: "all 0.3s ease" }}
            >
              <NotesCard note={item} onDelete={handleCardRemove} />
            </Col>
          ))}
        </Row>
      ) : notesLoading ? (
        <Loading cover={"content"} />
      ) : (
        <span className="light-text">It&apos;s empty here</span>
      )}
    </>
  );
}

export default Home;
