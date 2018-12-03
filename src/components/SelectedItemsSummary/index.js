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

  render() {
    const { qty, productId, ...rest } = this.props;
    return (
      <div className="qty-indicator-tag" {...rest}>
        {this.state.hover ? (
          <span onMouseLeave={() => this.setState({ hover: false })}>
            <QtyPickerField productId={productId} />
          </span>
        ) : (
          <span onMouseEnter={() => this.setState({ hover: true })}>
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
  state = {
    visible: false
  };
  toggleVisible = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    const { items, qty, total, ...rest } = this.props;
    return (
      <div {...rest}>
        <table
          {...rest}
          className={
            "selected-summary-table" + (this.state.visible ? "" : " invisible")
          }
        >
          <tbody>
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
          <Col>
            <a onClick={this.toggleVisible}>
              View all <Icon type={this.state.visible ? "down" : "up"} />
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

const SelectedItemsSummary = connect(selectedItemsSummarySelector)(
  _SelectedItemsSummary
);

export default SelectedItemsSummary;
