import { Button, Input } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import $ from "jquery";

function Modal({ open = false, onClose, children, width, title = 'Modal', okBtnText = 'Ok', onOk, loading}) {
  const destroyModal = () => {
    $("#modal-container").addClass("close");

    setTimeout(() => {
      if ($("#modal-container").hasClass("close")) {
        $("#modal-container").toggleClass("close");
        onClose();
      }
    }, 150);
  };
  const ModalContainer = () => {
    return (
      <div className="modal-content">
        <div className="popup-box" style={{width}}>
          <h3>{title}</h3>
          <CloseCircleFilled onClick={destroyModal} className="close-cta" />

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            <Button onClick={onOk} loading={loading} className="btn-cta">{okBtnText}</Button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (open) {
      $("#modal-container")
        .css({
          display: "block",
          visibility: "hidden",
          "pointer-events": "none",
          position: "absolute",
          height: "100vh",
          width: "100%",
          top: 0,
        })
        .toggleClass("backdrop visible");
    }
    return () => {
      $("#modal-container")
        .removeClass()
        .removeAttr("style")
        .removeAttr("class");
    };
  }, [open]);
  return (
    open && (
      <React.Fragment>
        {createPortal(
          <ModalContainer />,
          document.getElementById("modal-container")
        )}
      </React.Fragment>
    )
  );
}

export default Modal;
