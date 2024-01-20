import React, { useState } from "react";
import Modal from "../../shared-components/Modal";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../../../redux/actions/Auth";

function Header(props) {

  const {currentUser} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const handleSignOut = ()=>{
    dispatch(signOut())
  }
  return (
    <>
      <div className="header-container">
        <div className="header">
          <div>
            <h1 className="tasks-heading">
              My <span className="light-heading">Notes</span>
            </h1>
          </div>
          <div className="right-container">
            <span className="light-heading">Welcome, {currentUser.name.split(' ')[0]}</span>
            <Button onClick={handleSignOut} className="btn-cta">Logout</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
