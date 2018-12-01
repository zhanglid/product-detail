import React, { PureComponent } from "react";
import VariationTag from "../VariationTag";
import { connect } from "react-redux";
import "./style.scss";
import { featuresFiltersSelector, filterSelector } from "../../selectors";

export class FreatureFilter extends PureComponent {
  render() {
    const { features = [] } = this.props;
    return (
      <div className="feature-filter-container">
        {features.map((feature, index) => (
          <VariationTag
            key={index}
            _id={index}
            name={feature}
            active={feature === this.props.filter}
            onSelect={(_id, name) =>
              this.props.setFilter(name === this.props.filter ? null : name)
            }
          />
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  features: featuresFiltersSelector(state),
  filter: filterSelector(state)
});

const mapDispatch = ({ productDetailView: { setFilter } }) => ({
  setFilter
});

export default connect(
  mapState,
  mapDispatch
)(FreatureFilter);
