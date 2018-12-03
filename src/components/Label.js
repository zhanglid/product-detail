import React from "react";
import { Row, Col } from "antd";
import "../styles.css";

const labelSize = {
  xxl: 4,
  xl: 4,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
};

const childrenSize = {
  xxl: 20,
  xl: 20,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24
};

const Label = ({ label, children, ...rest }) => (
  <Row {...rest}>
    {label ? (
      <Col style={{ textAlign: "left" }} {...labelSize}>
        
        <span className="wbro-product-detail-media-screen-colon" >{label}</span>
      </Col>
    ) : (
      <Col {...labelSize} />
    )}
    <Col {...childrenSize}>{children}</Col>
  </Row>
);

export default Label;
