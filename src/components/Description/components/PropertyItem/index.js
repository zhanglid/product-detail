import React from "react";
import "./style.css";

export default class PropertyItem extends React.Component {
  render() {
    const { title, value, ...rest } = this.props;
    return (
      <li className="property-item" {...rest}>
        <span className="propery-title">{title}</span>
        <div className="propery-des" title={title}>
          {value}
        </div>
      </li>
    );
  }
}
