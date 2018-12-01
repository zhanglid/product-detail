import React from "react";
import { connect } from "react-redux";
import { Nav, NavItem } from "react-bootstrap";
import _ from "lodash";
import "./styles.scss";
import { activeTabKeySelector } from "../../selectors";

function fixOnTop() {
  return class TabMenu extends React.Component {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
      this.state = {
        fixed: false,
        offset: null,
        tabKey: "1"
      };
    }

    updateFixedStatus = () => {
      const currentStatus = window.scrollY > this.state.offset;
      if (this.state.fixed !== currentStatus) {
        this.setState({ fixed: currentStatus });
      }
    };

    handleScroll = e => {
      this.updateFixedStatus();
    };

    setNavPosition = () => {
      const currentPos =
        this.ref.current.getBoundingClientRect().top + window.scrollY;
      if (currentPos !== this.state.offset) {
        this.setState({
          offset: currentPos
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
      return (
        <div className="fixtop-view-placeholder clearfix" ref={this.navRef}>
          <div className="fixtop-view-container">{this.props.children}</div>
        </div>
      );
    }
  };
}

export class TabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.state = {
      fixed: false,
      navOffset: null,
      tabKey: props.tabKey
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
    return (
      <div
        className="wbro-product-detail-nav-container clearfix"
        ref={this.navRef}
      >
        <Nav
          bsStyle="tabs"
          activeKey={this.props.tabKey}
          onSelect={this.props.onSelect}
          className={
            "wbro-product-detail-nav" +
            (this.state.fixed ? " wbro-product-detail-nav-fixed" : "")
          }
        >
          <NavItem eventKey="1">Product Detail</NavItem>
          <NavItem eventKey="2">Seller</NavItem>
          {/* <NavItem eventKey="2">Feedback (147)</NavItem>
          <NavItem eventKey="3">Shipping & Payment</NavItem>
          <NavItem eventKey="4">Seller Guarantees</NavItem> */}
        </Nav>
      </div>
    );
  }
}

const mapState = state => ({
  tabKey: activeTabKeySelector(state)
});

const mapDispatch = ({ productDetailView: { setActiveTabKey } }) => ({
  onSelect: setActiveTabKey
});

export default connect(
  mapState,
  mapDispatch
)(TabMenu);
