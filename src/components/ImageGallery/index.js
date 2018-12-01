import React, { Component } from "react";
import ReactImageGallery from "react-image-gallery";
import ReactImageMagnify from "react-image-magnify";
import {Icon} from 'antd'
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.scss";

export default class ImageGallery extends Component {
  render() {
    const images = [
      {
        original:
          "https://statics.lettopia.com/wirelessbro-images/5b47ecc5531ff45a35e02871_1533246585185_Hong_group.jpg",
        thumbnail:
          "https://statics.lettopia.com/wirelessbro-images/5b47ecc5531ff45a35e02871_1533246585185_Hong_group.jpg"
      },
      {
        original:
          "https://statics.lettopia.com/wirelessbro-images/5ba52c7dba897112973a5015_1537551491440_8.jpg",
        thumbnail:
          "https://statics.lettopia.com/wirelessbro-images/5ba52c7dba897112973a5015_1537551491440_8.jpg"
      }
    ];
    return (
      <div>
      <ReactImageGallery
        items={images}
        showNav={true}
        showIndex={true}
        showPlayButton={false}
        lazyLoad={true}
        showFullscreenButton={false}
        thumbnailPosition="bottom"
        renderItem={({ original }, index) => (
          <ReactImageMagnify
            style={{ overflow: "auto" }}
            key={index}
            enlargedImagePosition="over"
            smallImage={{ alt: "broken", src: original, isFluidWidth: true }}
            largeImage={{ src: original, width: 2000, height: 2000 }}
          />
        )}
      />
      </div>
    );
  }
}
