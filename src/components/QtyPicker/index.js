import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { Alert } from "antd";
import "./style.scss";

export default class QtyPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: null
    };
  }

  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    parser: PropTypes.func
  };

  handleOnChange = (e, nextValue) => {
    e.stopPropagation();
    e.preventDefault();
    const { input: inputProps, parser, max } = this.props;
    const { value: originalValue, onChange } = inputProps;
    let value = parser(nextValue);
    if (isNaN(value)) {
      value = originalValue;
    }
    if (value > max) {
      this.setState(
        { alertMessage: `Purchases are limited to ${max} piece` },
        () => {
          setTimeout(() => this.setState({ alertMessage: null }), 3000);
        }
      );
    } else if (this.state.alertMessage !== null) {
      this.setState({ alertMessage: null });
    }
    const parsed = this.parseRange(value);
    onChange && onChange(parsed);
  };

  parseRange = value => {
    const { min, max } = this.props;
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }
    return value;
  };

  handleCloseAlert = e => {
    this.setState({ alertMessage: null });
  };

  render() {
    const { input: inputProps, meta, ...rest } = this.props;
    return (
      <div className="qtypicker-control">
        <div className="qtypicker" {...rest}>
          <a
            onClick={e => this.handleOnChange(e, inputProps.value - 1)}
            className="amount-down"
          >
            -
          </a>
          <input
            {...inputProps}
            onChange={e => this.handleOnChange(e, e.target.value)}
          />
          <a
            onClick={e => this.handleOnChange(e, inputProps.value + 1)}
            className="amount-up"
          >
            +
          </a>
        </div>
        {this.state.alertMessage && (
          <div className="alert" onClick={this.handleCloseAlert}>
            <Alert message={this.state.alertMessage} type="warning" />
          </div>
        )}
      </div>
    );
  }
}

const renderField = field => <QtyPicker {...field} />;
export const QtyPickerField = ({ productId, ...rest }) => (
  <Field
    name={"product-" + productId}
    component={renderField}
    type="text"
    format={(value = 0) => parseFloat(value)}
    {...rest}
  />
);

QtyPicker.defaultProps = {
  min: 0,
  max: 100,
  parser: value => {
    if (value instanceof String) {
      value = value.replace(/\$\s?|(,*)/g, "");
      value = /[+-]?([0-9]*)[.]?[0-9]{0,2}[0-9]*/.exec(value)[1];
    }
    return value;
  }
};
