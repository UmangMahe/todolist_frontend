import React, { useEffect, useState } from "react";
import Modal from "../../components/shared-components/Modal";
import { Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoading,
  signIn,
  signUp,
} from "../../redux/actions/Auth";

const registerContent = {
  id: "register",
  title: "Registration",
  okBtnText: "Register",
  modalBody: (
    <>
      <Form.Item
        name={"name"}
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your Name",
            whitespace: true,
          },
        ]}
      >
        <Input
          className="input-list-item"
          style={{ margin: 0 }}
          placeholder="Name *"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          className="input-list-item"
          style={{ margin: 0 }}
          placeholder="Email *"
        />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[
          {
            max: 10,
            message: "Phone number must be 10 digits!",
          },
        ]}
      >
        <Input
          className="input-list-item"
          style={{ margin: 0 }}
          placeholder="Phone Number"
        />
      </Form.Item>
    </>
  ),
};

const loginContent = {
  id: "login",
  title: "Login",
  okBtnText: "Login",
  modalBody: (
    <>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          className="input-list-item"
          style={{ margin: 0 }}
          placeholder="Email *"
        />
      </Form.Item>
    </>
  ),
};

function Authentication(props) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(registerContent);

  const handleModalContent = (type) => {
    if (type === "login") {
      setModalContent(loginContent);
    } else setModalContent(registerContent);

    setModal(true);
  };

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(showLoading());
      if (modalContent.id === "login") {
        dispatch(signIn(values));
      } else {
        dispatch(signUp(values));
      }
    });
  };

  const { loading, signup, message, showMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (showMessage && signup) {
      notification.success({
        message,
      });
      handleModalContent("login");
    }
  }, [dispatch, message, showMessage, signup]);
  return (
    <>
      <div className="auth-content">
        <div>
          <h1 className="tasks-heading">
            My <span className="light-heading">Notes</span>
          </h1>
        </div>
        <div
          onClick={() => handleModalContent("register")}
          className="right-container"
        >
          <span className="light-heading">Login/Register</span>
        </div>
      </div>

      <Modal
        width={400}
        loading={loading}
        title={modalContent?.title}
        okBtnText={modalContent?.okBtnText}
        onOk={handleFormSubmit}
        open={modal}
        onClose={() => setModal(false)}
      >
        <Form form={form}>{modalContent?.modalBody}</Form>
        <a
            className="link-color"
          onClick={() =>
            handleModalContent(
              modalContent?.id === "login" ? "register" : "login"
            )
          }
        >
          {modalContent?.id === "login" ? "Register >" : "Login >"}
        </a>
      </Modal>
    </>
  );
}

export default Authentication;
