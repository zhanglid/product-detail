import React, { Component } from "react";
import { List, Row, Col, Icon } from "antd";
import _VariationTag from "../VariationTag";
import { QtyPickerField } from "../QtyPicker";
import { dollar } from "../utils";
import numeral from "numeral";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import _ from 'lodash'
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

  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.state = {
      fixed: false,
      navOffset: null,
    };
    this.deboucedSetState = _.debounce(this.setState, 5);
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
    const currentStatus = window.scrollY > this.state.navOffset;
    
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
    
    if (currentPos !== this.state.navOffset) {
      this.setState({
        navOffset: currentPos
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
          <Icon type={expanded ? "up" : "down"} />
        </a>
      </div>
    );

    return (
      <List itemLayout="horizontal" loadMore={loadMore} {...rest}>
        <div ref={this.navRef} className={this.state.fixed ? "wbro-product-detail-table_col_fixed" : ""}>
            <ListItem
              variation = {<div style = {{paddingLeft:40,paddingTop:8}}>Variation</div>}
              price="price"
              qty={
                <div style = {{paddingLeft:"15%"}}>
                  <span>avaliable</span>
                  <div>(in cart)</div>
                </div>
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
                  <QtyPickerField productId={_id} style={{width: '100%'}} />
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

export default connect(
  mapState,
  mapDispatch
)(QtyInputList);
