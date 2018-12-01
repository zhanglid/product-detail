import React, { Component } from "react";
import { List, Row, Col, Icon } from "antd";
import _VariationTag from "../VariationTag";
import QtyPicker from "../QtyPicker";
import numeral from "numeral";
import "./style.scss";
import FreatureFilter from "../FeatureFilter";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  variationExpandedSelector,
  activeVariationIdSelector
} from "../../selectors";

const variationMapStateToProps = (state, { _id }) => ({
  active: activeVariationIdSelector(state) === _id
});

const variationMapDispatch = ({
  productDetailView: { setActiveVariationId }
}) => ({
  onSelect: _id => setActiveVariationId(_id)
});

const VariationTag = connect(
  variationMapStateToProps,
  variationMapDispatch
)(_VariationTag);

const ListItem = ({ variation, price, qty, input, className, ...rest }) => (
  <Row
    type="flex"
    align="middle"
    justify="space-between"
    {...rest}
    className={
      "qty-input-list-row variation-row" + (className ? " " + className : "")
    }
  >
    <Col span={10} xl={8}>
      {variation}
    </Col>
    <Col span={8} xl={8}>
      <Row type="flex" align="middle">
        <Col span={10} style={{ textAlign: "center" }}>
          {price}
        </Col>
        <Col span={14} style={{ textAlign: "center" }}>
          {qty}
        </Col>
      </Row>
    </Col>
    <Col span={6} xl={8}>
      {input}
    </Col>
  </Row>
);

export class QtyInputList extends Component {
  handleClick = _id => {
    const { onChange, value } = this.props;
    onChange && onChange(value === _id ? null : _id);
  };

  isExpandable = () => {
    const { data, displayLimit } = this.props;
    return data.length > displayLimit;
  };

  render() {
    const { onChange, displayLimit, data: rawData, ...rest } = this.props;

    const expanded = this.props.expanded || !this.isExpandable();
    const data = !expanded ? rawData.slice(0, displayLimit) : rawData;
    const loadMore = !expanded ? (
      <div className="bucket-tag-select indicator">
        <a onClick={this.props.onLoadMore}>
          <Icon type="down" />
        </a>
      </div>
    ) : null;

    return (
      <List itemLayout="horizontal" loadMore={loadMore} {...rest}>
        {/* <List.Item>
          <FreatureFilter/>
        </List.Item> */}
        <ListItem
          variation="variation"
          price="price"
          qty={
            <div>
              <span>avaliable</span>
              <div>(in cart)</div>
            </div>
          }
          className="list-title"
        />
        {data.map(({ name, in_stock = 100000, _id }, index) => (
          <List.Item
            className="qty-input-list-row"
            action={
              <Field
                name={_id}
                style={{ float: "right", maxWidth: "100%" }}
                component={field => <QtyPicker {...field.input} />}
                type="text"
                format={(value = 0) => parseFloat(value)}
              />
            }
          >
            <ListItem
              variation={<VariationTag name={name} _id={_id} key={index} />}
              price="$ 4.00 "
              qty={
                in_stock === undefined ? (
                  ""
                ) : (
                  <span>
                    {numeral(100).format("0,0") + " "}
                    <span className="small-hidden">avaliable</span>
                    <div>
                      <span>(4</span>
                      <span className="small-hidden"> in cart</span>
                      <span>)</span>
                    </div>
                  </span>
                )
              }
              input={
                <Field
                  name={"product-" + _id}
                  style={{ float: "right", maxWidth: "100%" }}
                  component={field => <QtyPicker {...field} />}
                  type="text"
                  format={(value = 0) => parseFloat(value)}
                />
              }
            />
          </List.Item>
        ))}
      </List>
    );
  }
}

QtyInputList.defaultProps = {
  displayLimit: 5
};

const mapState = state => ({
  expanded: variationExpandedSelector(state)
});

const mapDispatch = ({ productDetailView: { setVariationsExpanded } }) => ({
  onLoadMore: () => setVariationsExpanded(true)
});

export default reduxForm({ form: "buynow" })(
  connect(
    mapState,
    mapDispatch
  )(QtyInputList)
);
