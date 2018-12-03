import React from "react";
import { connect } from "react-redux";
import { selectedItemsSummarySelector } from "../../selectors";
import "./style.scss";
import { QtyPickerField } from "../QtyPicker";
import { reduxForm } from "redux-form";

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
      <span {...rest}>
        {this.state.hover ? (
          <span onMouseLeave={() => this.setState({ hover: false })}>
            <QtyPickerField productId={productId} />
          </span>
        ) : (
          <span onMouseEnter={() => this.setState({ hover: true })}>
            {`    (${qty})`}
          </span>
        )}
      </span>
    );
  }
}

const SelectedItemsSummary = connect(selectedItemsSummarySelector)(
  ({ items, qty, total, ...rest }) => (
    <div>
      <table {...rest} className="selected-summary-table">
        <tbody>
          {items.map(({ filter, items, qty = 0 }, index) => (
            <tr key={index} className="table-row">
              <td className="table-column-filter">{filter}</td>
              <td className="table-column-filter-qty">{`${qty} pcs`}</td>
              <td className="table-column-value">
                {items.map((item, itemIndex) => (
                  <span className="selected-item" key={index + "," + itemIndex}>
                    {`${item.name}`}
                    <span>
                      <QtyIndicator qty={item.qty} productId={item._id} />
                    </span>
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="selected-item-summary-title">
        <div>You have selected {qty} pcs</div>
        <div>Total: {}</div>
        {qty}
        {total}
      </div>
    </div>
  )
);

export default reduxForm({ form: "buynow" })(SelectedItemsSummary);
