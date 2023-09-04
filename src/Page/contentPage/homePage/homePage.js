import React from "react";
import Imageslider from "./imageslider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sampleimage4 from "./pageimage/cup1.png";
const HomePage = () => {
  return (
    <div>
      <div id="bxSlider">
        <Imageslider />
      </div>
      <div>
        <h1 style={{textAlign:"center"}}>대표메뉴</h1>
      </div>
      <div className="bestMenu" style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", margin: "30px"}}>
      <div>
        <img src={sampleimage4} alt="골라담는샐러드"  style={{width:"300px", height:"300px"}}/>
        <p>골라담는 샐러드</p>
      </div>
      <div>
        <img src={sampleimage4} alt="파스타 샐러드" style={{width:"300px", height:"300px"}}/>
        <p>파스타 샐러드</p>
      </div>
      <div>
        <img src={sampleimage4} alt="하와이안 포켓 샐러드" style={{width:"300px", height:"300px"}}/>
        <p>하와이안 포켓 샐러드</p>
      </div>
      </div>
      <div>
        <button>전체 메뉴 보기</button>
      </div>
    </div>
  );
};

export default HomePage;
