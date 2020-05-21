import React, { Component, Fragment} from "react";
import Breadcrumb from '../common/breadcrumb';
import Conversation from "./conversations";
import Chatting from "./chatting";
import UserDetail from "./userDetail";
import "./styles.css";
export default class Messages extends Component {
  render() {
    return (
      <Fragment>
        <Breadcrumb title="Message" parent="Message" />
        <div className="container">
          <div className="flex-container">
            <div className="conversation">
              <Conversation />
            </div>
            <div className="chatting">
              <Chatting />
            </div>
            <div className="user-detail">
              <UserDetail />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}