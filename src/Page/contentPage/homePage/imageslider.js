import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import sampleimage from "./pageimage/slider1.png";
import sampleimage2 from "./pageimage/slider2.png";
import sampleimage3 from "./pageimage/slider3.png";
import sampleimage4 from "./pageimage/sal1.jpg";
import sampleimage5 from "./pageimage/cup2.png";

const imageData = [
  {
    label: "Image 1",
    alt: "image1",
    url: sampleimage2,
  },

  {
    label: "Image 2",
    alt: "image2",
    url: sampleimage3,
  },

  {
    label: "Image 3",
    alt: "image3",
    url: sampleimage4,
  },
];
const Imageslider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleChange = (index) => {
    setImageIndex(index);
  };

  const renderSlides = imageData.map((image, index) => (
    <div key={image.alt}>
      <img
        src={image.url}
        alt={image.alt}
        style={{ width: "1200px", height: "850px" }}
      />
    </div>
  ));

  return (
    <div style={{ width: "1200px", margin: "0 auto", textAlign: "center" }}>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        selectedItem={imageIndex}
        onChange={handleChange}
        className="mainsilder"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default Imageslider;
