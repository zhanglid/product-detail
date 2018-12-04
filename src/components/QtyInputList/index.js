import React, { Component } from "react";
import { List, Row, Col, Icon } from "antd";
import _VariationTag from "../VariationTag";
import { QtyPickerField } from "../QtyPicker";
import { dollar } from "../utils";
import numeral from "numeral";
import { connect } from "react-redux";
import _ from "lodash";
import {
  variationExpandedSelector,
  activeVariationIdSelector,
  cartSelector,
} from "../../selectors";
import FixPic from "./fixPic"
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
    <Col className="section" span={6} xl={6}>
      {variation}
    </Col>
    <Col className="sections" span={6}>
      {price}
    </Col>
    <Col className="sections" span={6}>
      {qty}
    </Col>
    <Col className="sections" span={6} xl={6}>
      {input}
    </Col>
  </Row>
);

export class QtyInputList extends Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.listBottomRef = React.createRef();
    this.state = {
      fixed: false,
      navOffset: null,
      navOffsetEnd: null
    };
    // this.deboucedSetState = _.debounce(this.setState, 5);
  }

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
  updateFixedStatus = () => {
    const currentStatus =
      window.scrollY > this.state.navOffset &&
      window.scrollY < this.state.navOffsetEnd;
    if (this.state.fixed !== currentStatus) {
      this.setState({ fixed: currentStatus });
    }
  };

  handleScroll = e => {
    this.updateFixedStatus();
  };

  setNavPosition = () => {
    const currentPos =
      this.navRef.current.getBoundingClientRect().top + window.scrollY;
    const currentEnd =
      this.listBottomRef.current.getBoundingClientRect().top + window.scrollY;
    if (currentPos !== this.state.navOffset) {
      this.setState({
        navOffset: currentPos,
        navOffsetEnd: currentEnd
      });
    }
  };

  componentDidUpdate() {
    this.setNavPosition();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.updateFixedStatus();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { onChange, displayLimit, data: rawData, ...rest } = this.props;
    
    const expanded = this.props.expanded || !this.isExpandable();
    const data = !expanded ? rawData.slice(0, displayLimit) : rawData;
    const loadMore = this.isExpandable() && (
      <div className="bucket-tag-select indicator">
        <a onClick={this.toggleLoadMore}>
          <Icon style={{ color: "#08979c" }} type={expanded ? "up" : "down"} />
        </a>
      </div>
    );

    return (
      <React.Fragment>
        <List
          itemLayout="horizontal"
          loadMore={loadMore}
          {...rest}
          className="list-form-list-width"
        >
          {this.state.fixed && 
            <div><FixPic/></div>
          }
          <div
            ref={this.navRef}
            className={
              this.state.fixed ? "wbro-product-detail-table_col_fixed" : ""
            }
          >
            <ListItem
              variation={<div>variation</div>}
              price="price"
              qty={
                <span>
                  <span>avaliable</span>
                  <div>(in cart)</div>
                </span>
              }
              className="list-title"
            />
          </div>
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
                    <QtyPickerField productId={_id} style={{ width: "100%" }} />
                  </span>
                }
              />
            </List.Item>
          ))}
        </List>
        <div ref={this.listBottomRef} />
      </React.Fragment>
    );
  }
}

QtyInputList.defaultProps = {
  displayLimit: 2
};

const mapState = state => ({
  expanded: variationExpandedSelector(state),
});

const mapDispatch = ({ productDetailView: { setVariationsExpanded } }) => ({
  setExpanded: value => setVariationsExpanded(value)
});

export default connect(
  mapState,
  mapDispatch
)(QtyInputList);
