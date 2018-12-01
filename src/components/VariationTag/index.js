import React, { PureComponent } from "react";
import "./style.scss";

export default class VariationTag extends PureComponent {
  render() {
    const { name, _id, active, onSelect, ...rest } = this.props;
    return (
      <span
        className={`wbro-product-detail-tag` + (active ? " active" : "")}
        onClick={() => onSelect(_id, name)}
        {...rest}
      >
        <span>{name}</span>
      </span>
    );
  }
}
