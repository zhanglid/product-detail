import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Breadcrumb, Rate, Divider, Icon } from "antd";
import ImageGallery from "./components/ImageGallery";
import Label from "./components/Label";
import Payments from "./components/Payments";
import "antd/dist/antd.css";
import numeral from "numeral";
import TabMenu from "./components/TabMenu";
import FloatView from "./components/FloatView";
import group from "./mock/group";
import BuyNowForm from "./components/BuyNowForm";
import Description from "./components/Description";
import SellerInfo from "./components/SellerInfo";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import logger from "redux-logger";
import { init } from "@rematch/core";
import * as models from "./models";
import {
  displayInfoSelector,
  breadcrumbSelector,
  activeTabKeySelector,
  priceAreaInfoSelector,
  brandSelector,
  sellerSelector
} from "./selectors";

import "./styles.css";
import "./antd.less";
import { isArray } from "util";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const HeartIcon = props => <Icon component={HeartSvg} {...props} />;
const _CategoryBreadcrumb = ({ breadcrumbs = [], groupTitle }) => (
  <Breadcrumb>
    {[{ name: "HOME", _id: "ROOT" }, ...breadcrumbs, { name: groupTitle }].map(
      ({ name, _id }) => (
        <Breadcrumb.Item key={_id}>
          <a href="/">{name}</a>
        </Breadcrumb.Item>
      )
    )}
  </Breadcrumb>
);

const CategoryBreadcrumb = connect(breadcrumbSelector)(_CategoryBreadcrumb);

const FeedbackIndicator = ({ rate = 5, count = 0 }) => (
  <span className="wbro-product-detail-feedback-indicator">
    <Rate className="wbro-product-detail-feedback-rate" value={rate} disabled />
    <span style={{ color: "#08979c", fontSize: "16px", fontWeight: 700 }}>
      {rate.toFixed(2)}
    </span>
    <span style={{ color: "#999" }}>{` (${count} votes)`}</span>
  </span>
);

const OrderNumIndicator = ({ num = 0 }) => (
  <span style={{ color: "black" }}>{`Sold: ${num}`}</span>
);
const LinedNumberIndicator = ({ num = 0 }) => (
  <span style={{ color: "black" }}>{`${num} people linked`}</span>
);

const _SellerIndicator = ({ seller, ...rest }) =>
  seller ? (
    <span style={{ color: "grey" }} {...rest}>{`By ${seller}`}</span>
  ) : (
    <span />
  );

const SellerIndicator = connect(state => ({ seller: sellerSelector(state) }))(
  _SellerIndicator
);

const LinkedIndicator = () => (
  <span style={{ color: "red" }}>{`You Linked`}</span>
);

const ActivityBanner = ({ name = "On sell", time = "Clearance", ...rest }) => (
  <div {...rest}>
    <Row
      style={{
        height: "60px",
        backgroundSize: "cover",
        borderRadius: 8
      }}
    >
      <Col
        className="wbro-product-detail-activity-banner-left"
        xxl={8}
        xl={10}
        lg={12}
        md={12}
        sm={24}
        xs={24}
      >
        {name}
      </Col>
      <Col
        className="wbro-product-detail-activity-banner-right"
        xxl={8}
        xl={10}
        lg={12}
        md={12}
        sm={24}
        xs={24}
      >
        {time}
      </Col>
    </Row>
  </div>
);

const _ProductPriceArea = ({
  activity = false,
  price = [],
  delta,
  tags = [],
  ...rest
}) => (
  <div className="wbro-product-detail-product-price-area" {...rest}>
    {activity && <ActivityBanner style={{ marginBottom: 10 }} />}
    <Label
      style={{ lineHeight: "24px" }}
      label={<span className="wbro-product-detail-media-screen-title" />}
    >
      {price !== null && (
        <span className="wbro-product-detail-price-dollar">
          US ${" "}
          {isArray(price)
            ? price.map(p => p.toFixed(2)).join(" - ")
            : parseFloat(price).toFixed(2)}
        </span>
      )}
      <span className="small-hidden"> / piece</span>
      {!!delta && (
        <span
          className="wbro-product-detail-product-price-tags price"
          style={{ backgroundColor: delta < 0 ? "#cf1322" : "#389e0d" }}
        >
          {numeral(delta).format("0 %")}
        </span>
      )}
      <span
        className="product-detail-tags-container"
        style={{ display: "inline-block" }}
      >
        <ul className="wbro-product-detail-product-event-tag">
          {tags.map(tag => (
            <li>
              <a
                className={
                  tag === "HOT_SALE"
                    ? "wbro-product-detail-product-event-tag-red"
                    : "wbro-product-detail-product-event-tag-yellow"
                }
                style={{ color: "white" }}
              >
                {tag === "HOT_SALE" ? "HOT" : "DEAL"}
              </a>
            </li>
          ))}
        </ul>
      </span>
    </Label>
  </div>
);

const ProductPriceArea = connect(priceAreaInfoSelector)(_ProductPriceArea);

const ReturnPolicy = () => (
  <Label className="wbro-product-detail-padding-control" label="Return Policy">
    <span>
      <IconFont type="icon-tuichu" /> Returns accepted if product not as
      described, buyer pays return shipping fee; or keep the product & agree
      refund with seller.
    </span>
  </Label>
);

const Payment = () => (
  <Label className="wbro-product-detail-padding-control" label="Payment">
    <Payments methods={["visa", "tt", "amex"]} />
  </Label>
);

const BuyerProtection = () => (
  <Row className="wbro-product-detail-padding-control wbro-product-detail-buyer-production-banner-horizatal">
    <span className="wbro-product-detail-bp-ima" />
    <h3 className="wbro-product-detail-buyer-protection-info">
      Buyer Protection
    </h3>
    <ul className="wbro-product-detail-buy-protection-info-list util-clearfix">
      <li className="bp-info-item">
        <em>Full Refund</em> if you don't receive your order
      </li>
      <li className="bp-info-item">
        <em>Full or&nbsp;Partial Refund</em> , if the item is not as described
      </li>
    </ul>
  </Row>
);

const LinkToEbayButton = ({ ...rest }) => (
  <button {...rest}>Link to eBay</button>
);

const Actions = () => (
  <Label className="wbro-product-detail-padding-control">
    <Row className="wbro-product-detail-add-to-cart-button-row">
      <Col xxl={20} xl={20} lg={24} md={0} sm={0} xs={0}>
        <button className="product-detail-button add-to-cart">
          Add to cart
        </button>
        <LinkToEbayButton className="product-detail-button link-to-ebay" />
      </Col>
    </Row>
    <span className="wbro-product-detail-add-wishlist-action">
      <Icon type="heart" theme="twoTone" />
      <a href="/" style={{ marginLeft: 4 }}>
        Add to Wish List
        <span className="wbro-product-detail-wishlist-num"> (350 Adds)</span>
      </a>
    </span>
  </Label>
);

const ActionsFixed = favorite => (
  <div className="wbro-product-detail-detail-action-bar-fixed-tool-bar">
    <a className="wbro-product-detail-action-favorite-button-fixed">
      {favorite ? (
        <HeartIcon style={{ color: "#ff7605" }} />
      ) : (
        <Icon type="heart" />
      )}
    </a>
    <button className="product-detail-button add-to-cart button-fixed-flex-grow">
      Add to cart
    </button>
    <LinkToEbayButton className="product-detail-button link-to-ebay button-fixed-flex-grow" />
  </div>
);

class _App extends React.Component {
  componentDidMount() {
    this.props.fetchGroup();
    this.props.fetchCart();
  }

  render() {
    const { breadcrumb, tabKey } = this.props;
    return (
      <div style={{ backgroundColor: "white" }}>
        <Row style={{ height: "64px", backgroundColor: "blue" }}>
          Hello CodeSandbox
        </Row>
        <Row className="wbro-product-detail-breadcrumb">
          <CategoryBreadcrumb breadcrumbs={breadcrumb} groupTitle={""} />
        </Row>

        <div
          className="App"
          style={{
            maxWidth: "80%",
            margin: "auto"
          }}
        >
          <div className="product-detail-card product-detail-upper-container">
            <Row>
              <Col
                xl={10}
                lg={12}
                md={24}
                sm={24}
                xs={24}
                className="image-gallery-container"
                style={{ height: "100%" }}
              >
                <FloatView>
                  <ImageGallery />
                </FloatView>
              </Col>
              <Col xl={14} lg={12} md={24} sm={24} xs={24}>
                <h1 className="wbro-product-detail-product-name">
                  WiFi Smart Plug Mini on market, ASTROPANDA Smart Home Power
                  Control Socket, Remote Control Your Household Equipment from
                  Everywhere, No Hub Required, Works with Amazon Alexa and other
                  smart assistants (4 Packs)
                </h1>
                <FeedbackIndicator rate={3} count={2} />
                <Divider type="vertical" />
                <OrderNumIndicator num={111} />
                <Divider type="vertical" />
                <LinedNumberIndicator num={120} />
                <Divider type="vertical" />
                <SellerIndicator />
                {/* {!this.props.linked && 
              <div>
              <Divider type="vertical" />
              <LinkedIndicator />
              </div>
              } */}
                <ProductPriceArea />
                <div className="buynowform-container">
                  <BuyNowForm />
                </div>
                <Actions />
                <ActionsFixed favorite={true} />
                <ReturnPolicy />
                <Payment />
                <BuyerProtection />
              </Col>
            </Row>
          </div>

          <div className="product-detail-card product-detail-lower-container">
            <Row>
              <TabMenu />
            </Row>
            <Row style={{ width: "100%" }}>
              {tabKey === "1" && (
                <Description className="description" description={"😄"} />
              )}
              {tabKey === "2" && <SellerInfo className="description" />}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  ...displayInfoSelector(state),
  tabKey: activeTabKeySelector(state)
});

const mapDispatch = ({
  productDetailView: { fetchGroupAsync, fetchCartAsync }
}) => ({
  fetchGroup: fetchGroupAsync,
  fetchCart: fetchCartAsync
});

const App = connect(
  mapState,
  mapDispatch
)(_App);

const rootElement = document.getElementById("root");

const store = init({
  models,
  redux: {
    reducers: {
      form: formReducer
    },
    middlewares: [logger]
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
