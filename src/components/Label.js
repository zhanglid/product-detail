import React from "react";
import { Row, Col } from "antd";
import "../styles.css";

const labelSize = {
  xxl: 3,
  xl: 3,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
};

const childrenSize = {
  xxl: 21,
  xl: 21,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
};

const labelWideSize = {
  xxl: 4,
  xl: 4,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
};

const childrenWideSize = {
  xxl: 20,
  xl: 20,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
};

const Label = ({ label, children, wide, ...rest }) => (
  <Row {...rest}>
    {label ? (
      <Col style={{ textAlign: "left" }}  {...(wide === true ? labelWideSize:labelSize)}>
        <span className="wbro-product-detail-media-screen-colon">{label}</span>
      </Col>
    ) : (
      <Col {...(wide === true ? labelWideSize:labelSize)} />
    )}
    <Col {...(wide === true ? childrenWideSize : childrenSize)}>{children}</Col>
  </Row>
);

export default Label;
