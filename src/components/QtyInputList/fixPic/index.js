import React from "react";
import "./style.scss";
import {connect} from "react-redux"
import { imagesSelector, priceAreaInfoSelector, activeVariationSelector } from "../../../selectors";

export class fixPic extends React.Component {
  render() {
    
    return (
      <div className={"wbro-product-fixed-top"}>
        <span style={{position:"fixed", top:"2%", left:"5%", fontSize:24}}>${parseFloat(this.props.price.price).toFixed(2)}</span>
        <span style={{position:"fixed", top:"2%", left:"30%", fontSize:24}}>{this.props.filter !== undefined ? 
          <span><span style={{fontWeight:500}}>{this.props.filter.filter + " "}</span><span style={{fontSize:16}}>{this.props.filter.name !== undefined ? this.props.filter.name : "" }</span></span> : ""
        }</span>
        <img style={{position:"fixed", maxHeight:"60px", left:"80%", marginTop:5, marginBottom:5}} src={this.props.images} />
      </div>
    );
  }
}

const mapState = state => ({
  images: imagesSelector(state),
  price: priceAreaInfoSelector(state),
  filter: activeVariationSelector(state)
})

export default connect(mapState)(fixPic)
