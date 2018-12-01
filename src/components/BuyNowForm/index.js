import React, { Component } from "react";
import Label from "../Label";
import "./style.scss";
import QtyInputList from "../QtyInputList";
import FeatureFilter from "../FeatureFilter";
import { connect } from "react-redux";
import { variationsSelector, filterNameSelector } from "../../selectors";
import { capitalize } from "lodash";

export class BuyNowForm extends Component {
  render() {
    const { variations = [], filterName } = this.props;
    return (
      <div style={{ padding: "10px 20px 10px 20px" }}>
        <Label label={capitalize(filterName)}>
          <FeatureFilter />
        </Label>
        <Label
          label={<span className="small-hidden">Variation</span>}
          style={{ lineHeight: "32px" }}
        >
          <QtyInputList data={variations} />
        </Label>
      </div>
    );
  }
}

const mapState = state => ({
  variations: variationsSelector(state),
  filterName: filterNameSelector(state)
});

BuyNowForm.defaultProps = {
  filterName: "Feature"
};

export default connect(mapState)(BuyNowForm);
