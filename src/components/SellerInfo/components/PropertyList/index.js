import React from "react";
import PropertyItem from "../PropertyItem";
import "./style.css";

const PropertyList = ({ data = [] }) => (
  <ul className="product-property-list">
    {data.map(({ name, value }, index) => (
      <PropertyItem title={name} value={value} key={index} />
    ))}
  </ul>
);

export default PropertyList;
