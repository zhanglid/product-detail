import React, { Component } from "react";
import ReactImageGallery from "react-image-gallery";
import ReactImageMagnify from "react-image-magnify";
import { connect } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.scss";
import { imagesSelector } from "../../selectors";

export class ImageGallery extends Component {
  render() {
    const { images: rawImages = [] } = this.props;
    const images = (rawImages || []).map(url => ({
      original: url,
      thumbnail: url
    }));
    return (
      <div className = "product-detail-show-bullets">
        <ReactImageGallery
          items={images}
          showPlayButton={false}
          lazyLoad={true}
          showFullscreenButton={false}
          thumbnailPosition="bottom"
          showBullets = {true}
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

const mapState = state => ({
  images: imagesSelector(state)
});

export default connect(mapState)(ImageGallery);
