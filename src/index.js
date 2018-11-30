import React from "react";
import ReactDOM from "react-dom";
import {
  Row,
  Col,
  Breadcrumb,
  Rate,
  Divider,
  Icon,
  Button as AntButton
} from "antd";
import { Tabs, Tab } from "react-bootstrap";
import ImageGallery from "./components/ImageGallery";
import Label from "./components/Label";
import Payments from "./components/Payments";
import "antd/dist/antd.css";
import numeral from "numeral";
import TabMenu from "./components/TabMenu";
import group from "./mock/group";
import BuyNowForm from "./components/BuyNowForm";
import Description from "./components/Description";
import "./styles.css";
import "./antd.less";

const variations = [
  { name: "aaahhhhh", _id: 1 },
  { name: "bbbnhy", _id: 2 },
  { name: "cccqw", _id: 3 },
  { name: "ddd", _id: 4 },
  { name: "pink", _id: 5 },
  { name: "iphone6s", _id: 6 },
  { name: "iphone6sP", _id: 7 },
  { name: "iphone6", _id: 8 },
  { name: "cccqw", _id: 3 }
  // { name: "ddd", _id: 4 },
  // { name: "pink", _id: 5 },
  // { name: "iphone6s", _id: 6 },
  // { name: "iphone6sP", _id: 7 },
  // { name: "iphone6", _id: 8 },
  // { name: "bbbnhy", _id: 2 },
  // { name: "cccqw", _id: 3 },
  // { name: "ddd", _id: 4 },
  // { name: "pink", _id: 5 },
  // { name: "iphone6s", _id: 6 },
  // { name: "iphone6sP", _id: 7 },
  // { name: "iphone6", _id: 8 },
  // { name: "bbbnhy", _id: 2 },
  // { name: "cccqw", _id: 3 },
  // { name: "ddd", _id: 4 },
  // { name: "pink", _id: 5 },
  // { name: "iphone6s", _id: 6 },
  // { name: "iphone6sP", _id: 7 },
  // { name: "iphone6", _id: 8 },
  // { name: "bbbnhy", _id: 2 },
  // { name: "cccqw", _id: 3 },
  // { name: "ddd", _id: 4 },
  // { name: "pink", _id: 5 },
  // { name: "iphone6s", _id: 6 },
  // { name: "iphone6sP", _id: 7 },
  // { name: "iphone6", _id: 8 }
];
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});
const CategoryBreadcrumb = ({ categories = [], name = "" }) => (
  <Breadcrumb>
    {[{ name: "HOME", _id: "All" }, ...categories, { name, _id: "group" }].map(
      ({ name, _id }) => (
        <Breadcrumb.Item key={_id}>
          <a href="/">{name}</a>
        </Breadcrumb.Item>
      )
    )}
  </Breadcrumb>
);

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
  <span style={{ color: "black" }}>{`${num} orders`}</span>
);

const ActivityBanner = ({ name = "On sell", time = 60 * 60 * 6, ...rest }) => (
  <div {...rest}>
    <Row
      style={{
        height: "60px",
        backgroundSize: "cover",
        borderRadius: 8
      }}
    >
      <Col
        style={{
          backgroundColor: "#08979c",
          height: "60px",
          backgroundSize: "100% 100%"
        }}
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
        style={{
          backgroundColor: "#fa8c16",
          height: "60px",
          backgroundSize: "100% 100%"
        }}
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

const ProductPriceArea = ({ activity, price = [], delta }) => (
  <div className="wbro-product-detail-product-price-area">
    {activity && <ActivityBanner style={{ marginBottom: 10 }} />}
    <Label
      style={{ lineHeight: "24px" }}
      label={<span className="wbro-product-detail-media-screen-title" />}
    >
      <span className="wbro-product-detail-price-dollar">
        US $ {price.map(p => p.toFixed(2)).join(" - ")}
      </span>

      <span> / piece</span>
      {delta !== undefined && (
        <span
          className="wbro-product-detail-product-price-change"
          style={{ backgroundColor: delta < 0 ? "#cf1322" : "#389e0d" }}
        >
          {numeral(delta).format("0 %")}
        </span>
      )}
    </Label>
  </div>
);

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

const Actions = () => (
  <div className="wbro-product-detail-product-action-block wbro-product-detail-padding-control ">
    <Row className="wbro-product-detail-add-to-cart-button-row">
      <Col xxl={4} xl={4} lg={24} md={24} sm={24} xs={24} />
      <Col xxl={20} xl={20} lg={24} md={24} sm={24} xs={24}>
        <Row gutter={16} type="flex">
          <Col>
            <button className="product-detail-button add-to-cart">
              Add to cart
            </button>
          </Col>

          <Col>
            <button className="product-detail-button link-to-ebay">
              Link to eBay
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
    <span className="wbro-product-detail-add-wishlist-action">
      <Icon type="heart" theme="twoTone" />
      <a href="/" style={{ marginLeft: 4 }}>
        Add to Wish List
        <span className="wbro-product-detail-wishlist-num"> (350 Adds)</span>
      </a>
    </span>
  </div>
);

function App() {
  return (
    <div>
      <Row style={{ height: "64px", backgroundColor: "blue" }}>
        Hello CodeSandbox
      </Row>
      <Row className="wbro-product-detail-breadcrumb">
        <CategoryBreadcrumb
          categories={group.category.parents}
          name={group.title}
        />
      </Row>

      <div className="App" style={{ height: "5000vh" }}>
        <Row>
          <Col
            xxl={8}
            xl={10}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            style={{ padding: 32 }}
          >
            <ImageGallery />
          </Col>
          <Col xxl={16} xl={14} lg={12} md={12} sm={24} xs={24}>
            <h1 className="wbro-product-detail-product-name">{group.title}</h1>
            <FeedbackIndicator rate={3} count={2} />
            <Divider type="vertical" />
            <OrderNumIndicator num={111} />
            <ProductPriceArea
              activity={true}
              price={[1.11, 2.22]}
              delta={-0.05}
            />
            <div className="buynowform-container">
              <BuyNowForm variations={variations} />
            </div>
            <Actions />
            <ReturnPolicy />
            <Payment />
            <BuyerProtection />
          </Col>
        </Row>
        <Row>
          <TabMenu />
        </Row>
        <Row>
          <Description />
        </Row>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
