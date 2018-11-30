import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import _ from "lodash";
import "./styles.scss";

export default class TabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.state = {
      fixed: false,
      navOffset: null
    };
    this.deboucedSetState = _.debounce(this.setState, 5);
  }

  updateFixedStatus = () => {
    const currentStatus = window.scrollY > this.state.navOffset;
    if (this.state.fixed !== currentStatus) {
      this.setState({ fixed: currentStatus });
    }
  };

  handleScroll = e => {
    this.updateFixedStatus();
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      navOffset:
        this.navRef.current.getBoundingClientRect().top + window.scrollY
    });
    this.updateFixedStatus();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
        <div className="wbro-product-detail-nav-container clearfix" ref={this.navRef}>
          <Nav
            bsStyle="tabs"
            activeKey="1"
            onSelect={k => this.handleSelect(k)}
            className={
              "wbro-product-detail-nav" +
              (this.state.fixed ? " wbro-product-detail-nav-fixed" : "")
            }
          >
            <NavItem eventKey="1">Product Detail</NavItem>
            <NavItem eventKey="2">Feedback (147)</NavItem>
            <NavItem eventKey="3">Shipping & Payment</NavItem>
            <NavItem eventKey="4">Seller Guarantees</NavItem>
          </Nav>
        </div>
    );
  }
}
