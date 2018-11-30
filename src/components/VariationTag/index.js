import React, { PureComponent } from "react";
import "./style.css";

export default class VariationTag extends PureComponent {
  render() {
    const { name, _id, active, ...rest } = this.props;
    return (
      <span
        className={`wbro-product-detail-tag` + (active ? "active" : "")}
        onClick={() => this.handleClick(_id, name)}
        {...rest}
      >
        <span>{name}</span>
      </span>
    );
  }
}
