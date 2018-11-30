import React from "react";
import UIBox from "./components/UIBox";
import PropertyList from "./components/PropertyList";
import "./styles.css";

export class Description extends React.Component {
  render() {
    const { values = [], ...rest } = this.props;
    return (
      <div {...rest}>
        <UIBox title="Item specifics">
          <PropertyList data={values} />
        </UIBox>
        <UIBox title="Product Description" />
        <UIBox title="Packaging Details">
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
        </UIBox>
      </div>
    );
  }
}

export default Description;
