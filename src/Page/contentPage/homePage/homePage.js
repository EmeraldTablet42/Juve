import React from 'react';
import Imageslider from './imageslider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import golsal from './pageimage/SAL-00173694ff4-2bf0-4b1b-b21d-d8d0ee76b6af.jpg';
import pastasal from './pageimage/SAL-002fa5a24be-a816-4da3-849f-84f4d47b403a.png';
import hwaisal from './pageimage/SAL-003d699bb8e-bfb8-4ac4-be31-476008a13fbb.png';
import Allmenu from './allmenu';
import '../categorypage/styles/homepage.css';
const HomePage = () => {
  return (
    <div className="home">
      <div className="Slider" style={{ margin: '0' }}>
        <Imageslider />
      </div>
      {/* <div className="home-title">
        <h1 style={{ textAlign: 'center' }}>대표메뉴</h1>
      </div> */}
      {/* <hr style={{ margin: '10px 0', border: '1px solid #ccc' }} /> */}
      {/* <div className="bestMenu">
        <div>
          <img
            className="image-hover"
            src={golsal}
            alt="골라담는샐러드"
            style={{ width: '300px', height: '300px' }}
          />
          <p>골라담는 샐러드</p>
        </div>
        <div>
          <img
            className="image-hover"
            src={pastasal}
            alt="파스타 샐러드"
            style={{ width: '300px', height: '300px' }}
          />
          <p>파스타 샐러드</p>
        </div>
        <div>
          <img
            className="image-hover"
            src={hwaisal}
            alt="하와이안 포켓 샐러드"
            style={{ width: '300px', height: '300px' }}
          />
          <p>하와이안 포켓 샐러드</p>
        </div>
      </div> */}
      <hr style={{ margin: '100px 0', border: '1px solid #FAA92830' }} />
      <div className="home-allmenu">
        <h1>전체 메뉴 보기</h1>
        <h4>(상품가격은 옵션에 따라 변동 될 수 있습니다)</h4>
        <Allmenu />
      </div>
    </div>
  );
};

export default HomePage;
