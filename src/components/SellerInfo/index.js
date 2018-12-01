import React from "react";
import UIBox from "./components/UIBOX";
import PropertyList from "./components/PropertyList";
import "./styles.css";

export class SellerInfo extends React.Component {
  render() {
    const {  } = this.props;
    console.log('this.props321: ', this.props);
    return (
      <div>
      <UIBox title="Seller Information">
        <PropertyList
          data={[
            { name: "First Name", value: "AA00" },
            { name: "Last Name",value: "Chili"},
            { name: "Phone Number", value: "+1 6262232075" },
            { name: "Email", value: "aa00@wirelessbro.com" },
          ]}
        />
      </UIBox>
      </div>
    );
  }
}

export default SellerInfo;
