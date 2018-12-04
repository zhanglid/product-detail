import React, { PureComponent } from "react";
import VariationTag from "../VariationTag";
import { connect } from "react-redux";
import "./style.scss";
import { featuresFiltersSelector, filtersSelector } from "../../selectors";

export class FeatureFilter extends PureComponent {
  handleFilterClick = (_id, name) => {
    this.props.setFilter({
      index: this.props.index,
      value: name === this.props.filter ? null : name
    });
  };

  render() {
    const { features = [], filter, key = 0, index, ...rest } = this.props;
    return (
      <div className="feature-filter-container" {...rest}>
        {features.map(({ value, count }, index) => (
          <VariationTag
            key={index}
            _id={index}
            name={value}
            active={value === filter}
            disabled={count === 0}
            onSelect={this.handleFilterClick}
          />
        ))}
      </div>
    );
  }
}

const mapState = (state, { index = 0 }) => ({
  features: featuresFiltersSelector(state)[index],
  filter: filtersSelector(state)[index]
});

const mapDispatch = ({ productDetailView: { setFilter } }) => ({
  setFilter
});

export default connect(
  mapState,
  mapDispatch
)(FeatureFilter);
