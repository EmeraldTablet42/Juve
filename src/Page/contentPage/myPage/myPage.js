import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myPage.css";
import MyPageContentAreaRoutes from "./myPageContentAreaRoutes";
import coinImg from "../../../../src/Page/imagefile/apple.png";
import axios from "axios";
import { useSelector } from "react-redux";

const MyPage = () => {
  const auth = useSelector((state) => state.authindex);
  const [mileage, setMileage] = useState(0);

  const getMileage = () => {
    axios
      .get(`http://localhost:8090/member.getById?id=${auth.memberId}`)
      .then((res) => {
        setMileage(res.data.mileage);
      });
  };

  useEffect(() => {
    getMileage();
  }, []);

  return (
    <>
      <div className="myPage_layout">
        <div className="myPage_left">
          <ul className="left-ul" style={{ listStyle: "none" }}>
            {/* <li><a href="/member/mypage/myOrder">주문 내역</a></li> */}
            <li>
              <Link to="/member/mypage/myorder">주문 내역</Link>
            </li>
            <li>
              <Link to="/member/mypage/myshipment">배송지 관리</Link>
            </li>
            <li>
              <Link to="/member/mypage/myfavorite">찜 상품</Link>
            </li>
            <li>
              <Link to="/member/mypage/order">1:1 문의</Link>
            </li>
            <li>
              <a href="/member/mypage/myinfo">개인정보 변경</a>
            </li>
            <li style={{ border: "none", fontSize: "20px", color: "#07591C" }}>
              <img src={coinImg} style={{ width: "40px" }} alt="milage" />
              <br />
              {mileage}
            </li>
            {/* <li><Link to="/member/mypage/myInfo">개인정보 변경</Link></li> */}
          </ul>
        </div>
        <div className="myPageContentArea">
          <MyPageContentAreaRoutes />
        </div>
      </div>
    </>
  );
};

export default MyPage;
