import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert } from "antd";
import "./style.scss";

export default class QtyPicker extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
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
    const { onChange, parser, max } = this.props;
    const value = parser(nextValue);
    if (value > max) {
      this.setState({ alertMessage: `Purchases are limited to ${max} piece` });
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

  render() {
    const { value = 0, max, ...rest } = this.props;
    return (
      <div className="qtypicker-control">
        <div className="qtypicker" {...rest}>
          <a onClick={e => this.handleOnChange(e, value - 1)} className = "amount-down">-</a>
          <input
            ref={this.inputRef}
            value={value}
            onChange={e => this.handleOnChange(e, e.target.value)}
          />
          <a onClick={e => this.handleOnChange(e, value + 1)} className = "amount-up">+</a>
        </div>
        {this.state.alertMessage && (
          <div style={{ marginTop: 5, width: "300px" }}>
            <Alert message={this.state.alertMessage} type="warning" />
          </div>
        )}
      </div>
    );
  }
}

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
