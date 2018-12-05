import React from "react";
import UIBox from "./components/UIBox";
import PropertyList from "./components/PropertyList";
import "./styles.css";
import { connect } from "react-redux";
import { descriptionPropsSelector } from "../../selectors";
import TransactionTable from '../TransactionTable';
export class Description extends React.Component {
  render() {
    const { properties = [], description, packagingDetail, className, ...rest } = this.props;
    console.log(description);
    
     const transactions =  [
        {
          name: "j***",
          qty: 2,
          dest: "NY",
          date: "2018-10-25T19:14:45.428Z"
        },
        {
          name: "j***",
          qty: 1,
           dest : "NY",
           date : "2018-10-25T19:14:45.428Z"
        },
        {
           name : "k***",
           qty : 20,
           dest : "CA",
           date : "2018-10-23T17:43:26.226Z"
        },
        {
           name : "k***",
           qty : 2,
           dest : "CA",
           date : "2018-10-23T17:43:26.226Z"
        },
        {
           name: "k***",
          qty: 3,
          dest: "CA",
          date: "2018-10-23T17:43:26.226Z"
        },
        {
           name: "k***",
          qty: 3,
          dest: "CA",
          date: "2018-10-23T17:43:26.226Z"
        },
        {
           name: "k***",
          qty: 1,
          dest: "CA",
          date: "2018-10-23T17:43:26.226Z"
        },
        {
           name: "t***",
          qty: 1,
          dest: "CA",
          date: "2018-10-18T00:10:10.462Z"
        },
        {
           name: "j***",
          qty: 2,
          dest: "AZ",
          date: "2018-10-12T01:53:43.228Z"
        },
        {
           name: "b***",
          qty: 5,
          dest: "NY",
          date: "2018-10-10T01:13:48.496Z"
        }
      ]
      const pagination = { page: 1, limit: 10, total: 116 }
    

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
        <TransactionTable data =  {{transactions:transactions,pagination:pagination}}/>

      </div>
    );
  }
}

export default connect(descriptionPropsSelector)(Description);
