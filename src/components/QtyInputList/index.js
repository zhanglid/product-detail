import React, { Component } from "react";
import { List, Row, Col, Icon } from "antd";
import _VariationTag from "../VariationTag";
import { QtyPickerField } from "../QtyPicker";
import { dollar } from "../utils";
import numeral from "numeral";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  variationExpandedSelector,
  activeVariationIdSelector,
  cartSelector
} from "../../selectors";
import "./style.scss";

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

const _CartIndicator = ({ number, _id, ...rest }) =>
  number ? (
    <div {...rest}>
      <span>({number}</span>
      <span className="small-hidden"> in cart</span>
      <span>)</span>
    </div>
  ) : (
    <div />
  );

const CartIndicator = connect((state, { _id }) => ({
  number: cartSelector(state)[_id]
}))(_CartIndicator);

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

  toggleLoadMore = () => {
    const { expanded } = this.props;
    this.props.setExpanded(!expanded);
  };

  render() {
    const { onChange, displayLimit, data: rawData, ...rest } = this.props;

    const expanded = this.props.expanded || !this.isExpandable();
    const data = !expanded ? rawData.slice(0, displayLimit) : rawData;
    const loadMore = this.isExpandable() && (
      <div className="bucket-tag-select indicator">
        <a onClick={this.toggleLoadMore}>
          <Icon type={expanded ? "up" : "down"} />
        </a>
      </div>
    );

    return (
      <List itemLayout="horizontal" loadMore={loadMore} {...rest}>
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
        {data.map(({ name, price, in_stock = 100000, _id }, index) => (
          <List.Item className="qty-input-list-row">
            <ListItem
              variation={<VariationTag name={name} _id={_id} key={index} />}
              price={dollar(price)}
              qty={
                in_stock === undefined ? (
                  ""
                ) : (
                  <span>
                    {numeral(100).format("0,0") + " "}
                    <span className="small-hidden">avaliable</span>
                    <CartIndicator _id={_id} />
                  </span>
                )
              }
              input={
                <span className="qty-input-field">
                  <QtyPickerField productId={_id} />
                </span>
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
  setExpanded: value => setVariationsExpanded(value)
});

export default reduxForm({ form: "buynow" })(
  connect(
    mapState,
    mapDispatch
  )(QtyInputList)
);
