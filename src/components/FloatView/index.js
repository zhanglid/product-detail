import React, { PureComponent } from "react";
import "./style.scss";

export default class FloatView extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return (
      <div
        ref={this.ref}
        className="float-view-placeholder"
        style={{ height: "100%" }}
      >
        <div className="float-view-container">{this.props.children}</div>
      </div>
    );
  }
}
