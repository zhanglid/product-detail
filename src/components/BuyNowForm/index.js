import React, { Component } from "react";
import Label from "../Label";
import "./style.scss";
import QtyInputList from "../QtyInputList";
import FeatureFilter from "../FeatureFilter";
import { connect } from "react-redux";
import {
  variationsSelector,
  filtersNameSelector,
  hasItemSelectedSelector
} from "../../selectors";
import { capitalize } from "lodash";
import SelectedItemsSummary from "../SelectedItemsSummary";
import { reduxForm } from "redux-form";

export class BuyNowForm extends Component {
  render() {
    const { variations = [], filtersName = [], selected } = this.props;
    console.log(filtersName);
    return (
      <div style={{ padding: "10px 20px 10px 20px" }}>
        {filtersName.map((filterName, index) => (
          <Label
            style={{ marginBottom: "16px" }}
            label={capitalize(filterName)}
            key={index}
          >
            <FeatureFilter key={index} index={index} />
          </Label>
        ))}
        {/* <Label
          label={<span className="small-hidden">Variation</span>}
          style={{ lineHeight: "32px" }}
        > */}
        <QtyInputList data={variations} />
        {selected && <SelectedItemsSummary />}
        {/* </Label> */}
      </div>
    );
  }
}

const mapState = state => ({
  variations: variationsSelector(state),
  filtersName: filtersNameSelector(state),
  selected: hasItemSelectedSelector(state)
});

BuyNowForm.defaultProps = {
  filterName: "Feature"
};

export default connect(mapState)(reduxForm({ form: "buynow" })(BuyNowForm));
