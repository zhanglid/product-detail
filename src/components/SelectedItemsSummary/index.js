import React from "react";
import { connect } from "react-redux";
import { selectedItemsSummarySelector } from "../../selectors";
import "./style.scss";
import { QtyPickerField } from "../QtyPicker";
import { Row, Col, Icon } from "antd";
import { dollar } from "../utils";

class QtyIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  setHide = () => {
    this.setState({ hover: false });
  };

  setVisible = () => {
    this.setState({ hover: true });
  };

  render() {
    const { qty, productId, ...rest } = this.props;
    return (
      <div className="qty-indicator-tag" {...rest}>
        {this.state.hover ? (
          <span onMouseLeave={this.setHide}>
            <QtyPickerField productId={productId} />
          </span>
        ) : (
          <span onClick={this.setVisible} onMouseEnter={this.setVisible}>
            {`    (${qty})`}
          </span>
        )}
      </div>
    );
  }
}

const SelectedItemsSummaryRow = ({ filter, qty, items, ...rest }) => (
  <tr className="table-row" {...rest}>
    <td className="table-column-filter">{filter}</td>
    <td className="table-column-filter-qty">{`${qty} pcs`}</td>
    <td className="table-column-value">
      {items.map((item, index) => (
        <span className="selected-item" key={index}>
          <span style={{ display: "inline-block" }}>{`${item.name}`}</span>
          <span style={{ display: "inline-block" }} key={index}>
            <QtyIndicator qty={item.qty} productId={item._id} />
          </span>
        </span>
      ))}
    </td>
  </tr>
);

class _SelectedItemsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.viewAllClickRef = React.createRef();
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleViewAllClick = e => {
    e.stopPropagation();
    this.props.toggleVisible();
  };

  handleClickOutside = event => {
    if (
      this.ref &&
      !this.ref.current.contains(event.target) &&
      !this.viewAllClickRef.current.contains(event.target)
    ) {
      this.props.hide();
    }
  };
  render() {
    const { items, qty, total, visible, className, ...rest } = this.props;
    return (
      <div
        {...rest}
        className={"selected-summary-area" + (className ? ` ${className}` : "")}
      >
        <table
          {...rest}
          className={"selected-summary-table" + (visible ? "" : " invisible")}
        >
          <tbody ref={this.ref}>
            {items.map(({ filter, items, qty = 0 }, index) => (
              <SelectedItemsSummaryRow
                filter={filter}
                items={items}
                qty={qty}
                key={index}
              />
            ))}
          </tbody>
        </table>
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          className="selected-item-summary-title"
        >
          <Col>{qty} pcs</Col>
          <Col>{dollar(total)}</Col>
          <Col onClick={this.handleViewAllClick}>
            <a ref={this.viewAllClickRef}>
              View all <Icon type={visible ? "down" : "up"} />
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatch = ({
  productDetailView: { setSummaryInvisible, toggleSummaryVisible }
}) => ({
  hide: setSummaryInvisible,
  toggleVisible: toggleSummaryVisible
});

const SelectedItemsSummary = connect(
  selectedItemsSummarySelector,
  mapDispatch
)(_SelectedItemsSummary);

export default SelectedItemsSummary;
