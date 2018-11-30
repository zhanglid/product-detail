import React from "react";
import { Row, Col } from "antd";
import '../styles.css'
const Label = ({ label, children, ...rest }) => (
  <Row {...rest}>
    <Col style={{ textAlign: "left"}}  xxl={4} xl = {4} lg = {24} md = {24} sm = {24} xs = {24}>
      {label}<span className = "wbro-product-detail-media-screen-colon"></span>
    </Col>
    <Col  xxl={20} xl = {20} lg = {24} md = {24} sm = {24} xs = {24}>{children}</Col>
  </Row>
);

export default Label;
