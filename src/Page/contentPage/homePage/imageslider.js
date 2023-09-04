import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import sampleimage from "./pageimage/sal1.jpg"
import sampleimage2 from "./pageimage/sand1.png"
import sampleimage3 from "./pageimage/sand2.png"
import sampleimage4 from "./pageimage/cup1.png"
import sampleimage5 from "./pageimage/cup2.png"

const imageData = [
  {
    label: "Image 1",
    alt: "image1",
    url: sampleimage,
  },

  {
    label: "Image 2",
    alt: "image2",
    url: sampleimage2,
  },

  {
    label: "Image 3",
    alt: "image3",
    url: sampleimage3,
  },

  {
    label: "Image 4",
    alt: "image4",
    url: sampleimage4,
  },

  {
    label: "Image 5",
    alt: "image5",
    url: sampleimage5,
  },
];
const Imageslider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleChange = (index) => {
    setImageIndex(index);
  };

  const renderSlides = imageData.map((image, index) => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} style={{ width: "1000px", height: "700px" }}/>
    </div>
  ));

  return (
    <div style={{width:"1000px", margin: "0 auto", textAlign: "center"}}>
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