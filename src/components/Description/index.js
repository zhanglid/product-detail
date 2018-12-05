import React from "react";
import UIBox from "./components/UIBox";
import PropertyList from "./components/PropertyList";
import "./styles.css";
import { connect } from "react-redux";
import { descriptionPropsSelector } from "../../selectors";

export class Description extends React.Component {
  render() {
    const { properties = [], description, packagingDetail, className, ...rest } = this.props;
    console.log(description);
    return (
      <div
        {...rest}
        className={"description-area" + (className ? " " + className : "")}
      >
        <UIBox title="Item specifics">
          <PropertyList data={properties} />
        </UIBox>
        <UIBox title="Product Description">{description}</UIBox>
        {packagingDetail && <UIBox title="Packaging Details">
          <PropertyList
            data={[
              { name: "Unit Type", value: "piece" },
              { name: "Package Weight", value: "1.0kg (2.20lb.)" },
              {
                name: "Package Size",
                value: "10cm x 15cm x 10cm (3.94in x 5.91in x 3.94in)"
              }
            ]}
          />
        </UIBox>}
      </div>
    );
  }
}

export default connect(descriptionPropsSelector)(Description);
