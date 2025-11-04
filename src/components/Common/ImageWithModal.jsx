import React, { useState } from "react";
import { Col } from "reactstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ImageWithModal = ({
  src,
  thumbnailSize = "100px",
  alt = "",
  title = "نمایش عکس",
  className = "",
  imgClassName = "",
  rounded = false,
  onload,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLightbox = () => setIsOpen(!isOpen);

  return (
    <>
      <Col
        xs="auto"
        className={`p-0 ${className} image-with-modal`}
        style={{
          width: thumbnailSize,
          height: thumbnailSize,
          cursor: "pointer",
        }}
        onClick={toggleLightbox}
      >
        <img
          src={src}
          alt={alt}
          className={`w-100 h-100 object-fit-cover ${imgClassName} ${
            rounded ? "rounded" : ""
          }`}
          style={{}}
          onLoad={onload}
        />
      </Col>

      {isOpen && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={toggleLightbox}
          imageTitle={title}
          imageLoadErrorMessage="از لود عکس ناتوانیم "
          enableZoom={false}
          imagePadding={40}
        />
      )}
    </>
  );
};

export default ImageWithModal;
