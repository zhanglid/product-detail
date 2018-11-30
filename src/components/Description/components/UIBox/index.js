import React from "react";
import "./style.css";

export default class UIBox extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="ui-box">
        <div className="ui-box-title">{title}</div>
        <div className="ui-box-body">{children}</div>
      </div>
    );
  }
}
