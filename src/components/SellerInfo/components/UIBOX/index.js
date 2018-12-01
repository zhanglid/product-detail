import React from "react";
import "./style.css";

export default class UIBox extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="sui-box">
        <div className="sui-box-title">{title}</div>
        <div className="sui-box-body">{children}</div>
      </div>
    );
  }
}
