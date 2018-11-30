import React, { Component } from "react";
import { Form, List, Row, Col, Icon } from "antd";
import QtyPicker from "../QtyPicker";
import Label from "../Label";
import "./style.scss";
import VariationTag from "../VariationTag";
import numeral from "numeral";

class BucketTagsSelect extends React.Component {
  handleClick = _id => {
    const { onChange, value } = this.props;
    onChange && onChange(value === _id ? null : _id);
  };

  render() {
    const { data = [], value, onChange, ...rest } = this.props;
    const loadMore = (
      <div className="bucket-tag-select indicator">
        <a onClick={this.onLoadMore}>
          <Icon type="down" />
        </a>
      </div>
    );
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        loadMore={loadMore}
        renderItem={({ name, in_stock = 100000, _id }, index) => (
          <List.Item>
            <Row type="flex" align="middle" className="variation-row">
              <Col span={8}>
                <VariationTag
                  name={name}
                  _id={_id}
                  active={value === _id}
                  key={index}
                />
              </Col>
              <Col span={5}>5.00 $</Col>
              <Col span={5}>
                {in_stock === undefined
                  ? ""
                  : `${numeral(in_stock).format("0,0")} avaliable`}
              </Col>
              <Col span={6}>
                <QtyPicker style={{float: 'right'}} />
              </Col>
            </Row>
          </List.Item>
        )}
        {...rest}
      />
    );
  }
}

export class BuyNowForm extends Component {
  render() {
    const { variations = [], form } = this.props;
    return (
      <Form style={{ padding: "10px 20px 10px 20px" }}>
        <Label label="Variation" style={{ lineHeight: "32px" }}>
          {form.getFieldDecorator("variation")(
            <BucketTagsSelect data={variations} />
          )}
        </Label>
      </Form>
    );
  }
}

export default Form.create()(BuyNowForm);
