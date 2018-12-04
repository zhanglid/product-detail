import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import {
  imagesSelector,
  priceAreaInfoSelector,
  activeVariationSelector
} from "../../../selectors";

export class fixPic extends React.Component {
  render() {
    const { variation: { filters = [], name = "" } = {} } = this.props;
    console.log(this.props);
    return (
      <div className={"wbro-product-fixed-top"}>
        <span
          style={{ position: "fixed", top: "2%", left: "5%", fontSize: 24 }}
        >
          ${parseFloat(this.props.price.price).toFixed(2)}
        </span>
        <span
          style={{ position: "fixed", top: "2%", left: "30%", fontSize: 24 }}
        >
          <span>
            <span style={{ fontWeight: 500 }}>{filters.join(" ")}</span>
            <span style={{ fontSize: 16, marginLeft: 16 }}>{name}</span>
          </span>
        </span>
        <img
          style={{
            position: "fixed",
            maxHeight: "60px",
            left: "80%",
            marginTop: 5,
            marginBottom: 5
          }}
          src={this.props.images}
        />
      </div>
    );
  }
}

const mapState = state => ({
  images: imagesSelector(state),
  price: priceAreaInfoSelector(state),
  variation: activeVariationSelector(state)
});

export default connect(mapState)(fixPic);
