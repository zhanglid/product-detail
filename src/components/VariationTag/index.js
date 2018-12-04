import React, { PureComponent } from "react";
import "./style.scss";

export default class VariationTag extends PureComponent {
  render() {
    const { name, _id, active, onSelect, disabled, ...rest } = this.props;
    return (
      <span
        className={`wbro-product-detail-tag` + (active ? " active" : "") + (disabled ? " disabled" : "") }
        onClick={() => onSelect(_id, name)}
        {...rest}
      >
        <span>{name}</span>
      </span>
    );
  }
}
