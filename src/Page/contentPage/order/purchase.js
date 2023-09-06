import React, { useState, useEffect } from "react";
import { validateEmail } from "../member/validation";
import { useDispatch, useSelector } from "react-redux";
import { addMenuData, clearCart } from "../categorypage/components/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "../categorypage/styles/purchase.css";
import { useNavigate } from "react-router";
import { removeFromCart } from "../categorypage/components/cartSlice";
import { setOrder } from "./purchaseSlice";
import DaumPostcodeApiOrder from "./daumPostcodeApiOrder";
const Purchase = () => {
  useEffect(() => {
    getMemberInfoByLoginToken();
    getMemberShipment();
  }, []);

  const auth = useSelector((state) => state.authindex);
  // 회원정보 가져오기
  const getMemberInfoByLoginToken = () => {
    if (auth.isLogined) {
      axios
        .post(
          `http://localhost:8090/member/getMemberByToken?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        )
        .then((res) => {
          alert(JSON.stringify(res.data));
          const dbInfo = res.data;
          const addr = dbInfo.address.split("^");
          const phone = dbInfo.phone.split("-");
          let tempTel = "02--".split("-");
          if (dbInfo.tel) {
            tempTel = dbInfo.tel.split("-");
          }
          setMemberInfo({
            ...memberInfo,
            name: dbInfo.name,
            email: dbInfo.email,
            addr: { addr1: addr[0], addr2: addr[1], addr3: addr[3] },
            phone: { phone1: phone[0], phone2: phone[1], phone3: phone[2] },
            tel: { tel1: tempTel[0], tel2: tempTel[1], tel3: tempTel[2] },
          });
        });
    }
  };

  // 주소창 팝업 state - 기존값 false//
  const [addrPopupMember, setAddrPopupMember] = useState(false);
  const handleAddrPopupMember = () => {
    setAddrPopupMember(!addrPopupMember);
  };

  const setAddrMember = (addr) => {
    setMemberInfo((prevState) => ({
      ...prevState,
      addr: addr,
    }));
  };
  const [addrPopupShipment, setAddrPopupShipment] = useState(false);
  const handleAddrPopupShipment = () => {
    setAddrPopupShipment(!addrPopupShipment);
  };

  const setAddrShipment = (addr) => {
    setSelectedShipment((prevState) => ({
      ...prevState,
      addr: addr,
    }));
  };

  // 회원의 배송지 정보 가져오기
  const [memberShipment, setMemberShipment] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState({
    destination: "",
    name: "",
    addr: { addr1: "", addr2: "", addr3: "" },
    phone: { phone1: "010", phone2: "", phone3: "" },
    tel: { tel1: "02", tel2: "", tel3: "" },
    message: "",
  });
  const getMemberShipment = () => {
    if (auth.isLogined) {
      axios
        .post(
          `http://localhost:8090/member/mypage/get.shipment.all?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        )
        .then((res) => {
          alert(JSON.stringify(res.data));
          const shipments = res.data.shipments;
          const defaultShipment = shipments[0];
          const defaultAddress = defaultShipment.address.split("^");
          const defaultPhone = defaultShipment.phone.split("-");
          let defaultTel = "02--".split("-");
          if (defaultShipment.tel) {
            defaultTel = defaultShipment.tel.split("-");
          }
          setMemberShipment(shipments);
          // setSelectedShipment({
          //   ...selectedShipment,
          //   destination: shipments[0].destination,
          //   name: shipments[0].name,
          //   addr: {
          //     addr1: defaultAddress[0],
          //     addr2: defaultAddress[1],
          //     addr3: defaultAddress[2],
          //   },
          //   phone: {
          //     phone1: defaultPhone[0],
          //     phone2: defaultPhone[1],
          //     phone3: defaultPhone[2],
          //   },
          //   tel: {
          //     tel1: defaultTel[0],
          //     tel2: defaultTel[1],
          //     tel3: defaultTel[2],
          //   },
          // });
        });
    }
  };

  const handleShipment = (e) => {
    if (
      e.target.name === "name" ||
      e.target.name === "destination" ||
      e.target.name === "message"
    ) {
      setSelectedShipment({
        ...selectedShipment,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name.startsWith("addr")) {
      setSelectedShipment({
        ...selectedShipment,
        addr: {
          ...selectedShipment.addr,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name.startsWith("phone")) {
      setSelectedShipment({
        ...selectedShipment,
        phone: {
          ...selectedShipment.phone,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name.startsWith("tel")) {
      setSelectedShipment({
        ...selectedShipment,
        tel: {
          ...selectedShipment.tel,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const [selectedShipmentIndex, setSelectedShipmentIndex] = useState(0);
  const handleShipmentRadioChange = (selectedIndex) => {
    const selectedShipment = memberShipment[selectedIndex];
    const addrr = selectedShipment.address.split("^");
    const phonee = selectedShipment.phone.split("-");
    let tele = selectedShipment.tel.split("-");
    setSelectedShipmentIndex(selectedIndex);
    setSelectedShipment({
      destination: selectedShipment.destination,
      name: selectedShipment.name,
      addr: {
        addr1: addrr[0],
        addr2: addrr[1],
        addr3: addrr[2],
      },
      phone: {
        phone1: phonee[0],
        phone2: phonee[1],
        phone3: phonee[2],
      },
      tel: {
        tel1: tele[0],
        tel2: tele[1],
        tel3: tele[2],
      },
    });
  };

  const [shipmentType, setShipmentType] = useState("");
  const handleShipmentType = (e) => {
    if (e.target.value === "equalWithOrder") {
      setSelectedShipment(memberInfo);
      setShipmentType("eqaul");
    }
    if (e.target.value === "resent") {
      handleShipmentRadioChange(0);
      setShipmentType("resent");
    }
    if (e.target.value === "new") {
      setSelectedShipment({
        destination: "",
        name: "",
        addr: { addr1: "", addr2: "", addr3: "" },
        phone: { phone1: "010", phone2: "", phone3: "" },
        tel: { tel1: "02", tel2: "", tel3: "" },
        email: "",
      });
      setShipmentType("new");
    }
  };

  // 회원정보 더미데이터(DB통신시 이부분을 setMemberInfo로 바꿔주면됨)
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    email: "",
    addr: { addr1: "", addr2: "", addr3: "" },
    phone: { phone1: "010", phone2: "", phone3: "" },
    tel: { tel1: "02", tel2: "", tel3: "" },
  });
  const navi = useNavigate();
  //Redux 부분
  const dispatch = useDispatch();
  const [keyEvent, setKeyEvent] = useState("");
  const handleKeyEvent = (e) => {
    const key = e.key;
    setKeyEvent(key);
    console.log(key);
  };

  //카트 DB에서 삭제
  const delCartDB = (index) => {
    alert(JSON.stringify(cartList[index]));
    axios
      .post("http://localhost:8090/order/del.cart", cartList[index], {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        alert(res.data);
        getCartByLoginToken();
      });
  };

  //// 카트 redux에서 삭제
  const delCartRedux = (index) => {
    dispatch(removeFromCart(index));
  };

  const delCart = (index) => {
    delCartDB(index);
    if (!auth.isLogined) {
      delCartRedux(index);
    }
  };

  const handleMemberInfo = (e) => {
    if (e.target.name === "name" || e.target.name === "email") {
      setMemberInfo({
        ...memberInfo,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name.startsWith("addr")) {
      setMemberInfo({
        ...memberInfo,
        addr: {
          ...memberInfo.addr,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name.startsWith("phone")) {
      setMemberInfo({
        ...memberInfo,
        phone: {
          ...memberInfo.phone,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name.startsWith("tel")) {
      setMemberInfo({
        ...memberInfo,
        tel: {
          ...memberInfo.tel,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const phoneArr = ["010", "016", "017", "018", "019"];
  const telArr = [
    "02",
    "031",
    "032",
    "033",
    "041",
    "042",
    "043",
    "044",
    "051",
    "052",
    "053",
    "054",
    "055",
    "061",
    "062",
    "063",
    "064",
    "0502",
    "0503",
    "0504",
    "0505",
    "0506",
    "0507",
    "05 08",
    "070",
    "010",
    "011",
    "016",
    "017",
    "018",
    "019",
  ];
  const handleTel = (e) => {
    if (e.target.name === "tel1") {
      setMemberInfo({
        ...memberInfo,
        tel: { ...memberInfo.tel, [e.target.name]: e.target.value },
      });
    } else if (
      /^[0-9]$/.test(keyEvent) ||
      keyEvent === "Backspace" ||
      keyEvent === "Delete"
    ) {
      setMemberInfo({
        ...memberInfo,
        tel: { ...memberInfo.tel, [e.target.name]: e.target.value },
      });
    }
  };
  // 모든 데이터
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8090/product.get").then((res) => {
      setAllData(res.data.products);
    });

    getCartByLoginToken();

    if (!auth.isLogined) {
      setCartList(cart.cart);
    }
    if (!auth.isLogined && cart.cart.length === 0) {
      alert("주문상품이 존재하지 않습니다.");
      navi("/");
    }
  }, []);

  //DB에서 카트 받아오기
  const getCartByLoginToken = () => {
    if (auth.isLogined)
      axios
        .get(
          `http://localhost:8090/order/get.cart?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        )
        .then((res) => {
          // alert(JSON.stringify(res.data.carts));
          // const carts = res.data.carts;
          // alert(JSON.stringify(carts));
          if (res.data.carts.length === 0) {
            alert("주문상품이 존재하지 않습니다.");
            navi("/");
            return null;
          }
          setCartList(res.data.carts);
        })
        .catch(() => {
          alert("카드 받아오기 에러");
          alert("DB통신에러. 잠시 후 다시 이용해주세요.");
          navi("/");
        });
  };

  // cartdata
  //가장 중요한 부분! cartList의 초기값은 redux의 장바구니인데, 로그인이 되면 로그인 데이터로 뒤덮임!
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [cartList, setCartList] = useState([]);
  const cart = useSelector((state) => state.cart);

  const cTn = useSelector((state) => state.codeToName).productCodeToName;

  const totalCartPrice = cartList.reduce(
    (total, item) => total + item.price,
    0
  );
  const shipfee = totalCartPrice < 50000 ? 4000 : 0;
  const finalPrice = totalCartPrice + shipfee;
  const point = totalCartPrice * 0.1;

  const regOrder = () => {
    // alert(JSON.stringify(cartList));
    alert(totalCartPrice);
    alert(shipfee);
    alert(finalPrice);
    const order = {
      sender: memberInfo.name,
      senderAddress: `${memberInfo.addr.addr1}^${memberInfo.addr.addr2}^${
        memberInfo.addr.addr3 ? memberInfo.addr.addr3 : ""
      }`,
      senderPhone: `${memberInfo.phone.phone1}-${memberInfo.phone.phone2}-${memberInfo.phone.phone3}`,
      senderTel:
        memberInfo.tel.tel2 && memberInfo.tel.tel3
          ? `${memberInfo.tel.tel1}-${memberInfo.tel.tel2}-${memberInfo.tel.tel3}`
          : "",
      senderEmail: memberInfo.email,
      destination: selectedShipment.destination,
      recipient: selectedShipment.name,
      recipientAddress: `${selectedShipment.addr.addr1}^${
        selectedShipment.addr.addr2
      }^${
        selectedShipment.addr.addr3
          ? selectedShipment.addr.addr3
          : selectedShipment.addr.addr3
      }`,
      recipientPhone: `${selectedShipment.phone.phone1}-${selectedShipment.phone.phone2}-${selectedShipment.phone.phone3}`,
      recipientTel:
        selectedShipment.tel.tel2 && selectedShipment.tel.tel3
          ? `${selectedShipment.tel.tel1}-${selectedShipment.tel.tel2}-${selectedShipment.tel.tel3}`
          : "",
      orderStatus: 1,
      carts: cartList, // Carts 객체 형태로 전달
      mileage: auth.isLogined ? point : 0,
      orderDate: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      totalCartPrice: totalCartPrice,
      shipfee: shipfee,
      finalPrice: finalPrice,
      message: selectedShipment.message,
    };
    axios
      .post(`http://localhost:8090/order/reg.order`, order, {
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        alert(JSON.stringify(res.data));
        if (!auth.isLogined) {
          dispatch(clearCart());
        }
        dispatch(setOrder(res.data));
        navi("/purchasecheck");
      })
      .catch((error) => {
        alert("등록오류");
        alert(error);
      });
  };

  return (
    <div className="purchase-wrapper">
      <div className="purchase-margin">
        <div className="purchase-addr">
          <h2>주 문 정 보</h2>
          <div className="purchase-table">
            {auth.isLogined && (
              <table
                id="basicInfo"
                className="joinTbl"
                onKeyDown={handleKeyEvent}
              >
                <tr>
                  <th className="col1">이름</th>
                  <td>{memberInfo.name}</td>
                </tr>
                <tr>
                  <th className="col1" rowSpan={3} valign="top">
                    주소
                  </th>
                  <td>{memberInfo.addr.addr1}</td>
                </tr>
                <tr>
                  <td>{memberInfo.addr.addr2}</td>
                </tr>
                <tr>
                  <td>{memberInfo.addr.addr3}</td>
                </tr>
                <tr>
                  <th className="col1">휴대전화</th>
                  <td>{`${memberInfo.phone.phone1}-${memberInfo.phone.phone2}-${memberInfo.phone.phone3}`}</td>
                </tr>
                <tr>
                  <th className="col1">일반전화</th>
                  <td>
                    <select
                      name="tel1"
                      value={memberInfo.tel.tel1}
                      onChange={handleTel}
                    >
                      {telArr.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    -{" "}
                    <input
                      name="tel2"
                      maxLength={4}
                      value={memberInfo.tel.tel2}
                      onChange={handleTel}
                    />{" "}
                    -{" "}
                    <input
                      name="tel3"
                      maxLength={4}
                      value={memberInfo.tel.tel3}
                      onChange={handleTel}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="col1">이메일</th>
                  <td>{memberInfo.email}</td>
                </tr>
              </table>
            )}
            {!auth.isLogined && (
              <table
                id="basicInfo"
                className="joinTbl"
                onKeyDown={handleKeyEvent}
              >
                <tr>
                  <th className="col1">이름</th>
                  <td>
                    <input
                      name="name"
                      maxLength={4}
                      value={memberInfo.name}
                      onChange={handleMemberInfo}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="col1" rowSpan={3} valign="top">
                    주소
                  </th>
                  <td>
                    <input
                      name="addr1"
                      value={memberInfo.addr.addr1}
                      onChange={handleMemberInfo}
                    />
                    <button name="popUpMember" onClick={handleAddrPopupMember}>
                      주소 검색
                    </button>
                    {addrPopupMember && (
                      <DaumPostcodeApiOrder
                        addr={memberInfo.addr}
                        setAddr={setAddrMember}
                        addrPopup={addrPopupMember}
                        setAddrPopup={setAddrPopupMember}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      name="addr2"
                      value={memberInfo.addr.addr2}
                      onChange={handleMemberInfo}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      name="addr3"
                      value={memberInfo.addr.addr3}
                      onChange={handleMemberInfo}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="col1">휴대전화</th>
                  <td>
                    <select
                      name="phone1"
                      value={memberInfo.phone.phone1}
                      onChange={handleMemberInfo}
                    >
                      {phoneArr.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <input
                      name="phone2"
                      value={memberInfo.phone.phone2}
                      onChange={handleMemberInfo}
                      maxLength={4}
                    />
                    <input
                      name="phone3"
                      value={memberInfo.phone.phone3}
                      onChange={handleMemberInfo}
                      maxLength={4}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="col1">일반전화</th>
                  <td>
                    <select
                      name="tel1"
                      value={memberInfo.tel.tel1}
                      onChange={handleMemberInfo}
                    >
                      {telArr.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <input
                      name="tel2"
                      value={memberInfo.tel.tel2}
                      onChange={handleMemberInfo}
                      maxLength={4}
                    />
                    <input
                      name="tel3"
                      value={memberInfo.tel.tel3}
                      onChange={handleMemberInfo}
                      maxLength={4}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="col1">이메일</th>
                  <td>
                    <input
                      name="email"
                      value={memberInfo.email}
                      onChange={handleMemberInfo}
                    />
                  </td>
                </tr>
              </table>
            )}
          </div>
        </div>
      </div>
      <div className="purchase-margin">
        <div className="purchase-get">
          <h2>배송지</h2>
          <div className="purchase-table">
            <div className="purchase-shipSelector">
              <input
                className="purchase-shipSelector-radio"
                name="purchase-shipSelector"
                type="radio"
                value="equalWithOrder"
                onChange={handleShipmentType}
              />
              주문자 정보와 동일
              {auth.isLogined && memberShipment.length !== 0 && (
                <>
                  <input
                    className="purchase-shipSelector-radio"
                    name="purchase-shipSelector"
                    type="radio"
                    value="resent"
                    onChange={handleShipmentType}
                  />
                  기존 배송지
                </>
              )}
              <input
                className="purchase-shipSelector-radio"
                name="purchase-shipSelector"
                type="radio"
                value="new"
                defaultChecked
                onChange={handleShipmentType}
              />
              신규 배송지
            </div>
            <table
              id="resentShipment"
              className="joinTbl"
              onKeyDown={handleKeyEvent}
            >
              <tr>
                <th className="col1">배송지명</th>
                <td>
                  <input
                    name="destination"
                    value={selectedShipment.destination}
                    onChange={handleShipment}
                  />
                  {shipmentType === "resent" &&
                    memberShipment.length !== 0 &&
                    memberShipment.map((v, i) => (
                      <ul
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      >
                        <li style={{ float: "left", marginLeft: "10px" }}>
                          <input
                            id={`shipmentRadioButton-${i}`}
                            name="shipmentList"
                            value={i}
                            type="radio"
                            checked={i === selectedShipmentIndex}
                            onChange={() => handleShipmentRadioChange(i)}
                          />
                          <label
                            htmlFor={`shipmentRadioButton-${i}`}
                            style={{ verticalAlign: "top", marginLeft: "5px" }}
                          >
                            {v.destination}
                            <b>{v.isDefault === "Y" ? "[기본배송지]" : ""}</b>
                          </label>
                        </li>
                      </ul>
                    ))}
                </td>
              </tr>
              <tr>
                <th className="col1">수령인</th>
                <td>
                  <input
                    name="name"
                    value={selectedShipment.name}
                    onChange={handleShipment}
                    maxLength={4}
                  />
                </td>
              </tr>
              <tr>
                <th className="col1" rowSpan={3} valign="top">
                  주소
                </th>
                <td>
                  <input
                    name="addr1"
                    value={selectedShipment.addr.addr1}
                    onChange={handleShipment}
                  />
                  <button
                    name="popUpShipment"
                    onClick={handleAddrPopupShipment}
                  >
                    주소 검색
                  </button>
                  {addrPopupShipment && (
                    <DaumPostcodeApiOrder
                      addr={selectedShipment.addr}
                      setAddr={setAddrShipment}
                      addrPopup={addrPopupShipment}
                      setAddrPopup={setAddrPopupShipment}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    name="addr2"
                    value={selectedShipment.addr.addr2}
                    onChange={handleShipment}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    name="addr3"
                    value={selectedShipment.addr.addr3}
                    onChange={handleShipment}
                  />
                </td>
              </tr>
              <tr>
                <th className="col1">휴대전화</th>
                <td>
                  <select
                    name="phone1"
                    value={selectedShipment.phone.phone1}
                    onChange={handleShipment}
                  >
                    {phoneArr.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone2"
                    value={selectedShipment.phone.phone2}
                    onChange={handleShipment}
                    maxLength={4}
                  />
                  <input
                    name="phone3"
                    value={selectedShipment.phone.phone3}
                    onChange={handleShipment}
                    maxLength={4}
                  />
                </td>
              </tr>
              <tr>
                <th className="col1">일반전화</th>
                <td>
                  <select
                    name="tel1"
                    value={selectedShipment.tel.tel1}
                    onChange={handleShipment}
                  >
                    {telArr.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <input
                    name="tel2"
                    value={selectedShipment.tel.tel2}
                    onChange={handleShipment}
                    maxLength={4}
                  />
                  <input
                    name="tel3"
                    value={selectedShipment.tel.tel3}
                    onChange={handleShipment}
                    maxLength={4}
                  />
                </td>
              </tr>
            </table>
          </div>
          <div className="purchase-mesege">
            <select
              name="message"
              value={selectedShipment.message}
              onChange={handleShipment}
            >
              <option value="" hidden>
                배송 메세지
              </option>
              <option>배송전 연락주세요</option>
              <option>직접방문할게요</option>
              <option>계좌이체하겠습니다</option>
            </select>
          </div>
        </div>
      </div>
      <div className="purchase-margin">
        <div className="purchase-product">
          <p>
            주문 상품{" "}
            <button
              onClick={() => {
                alert(selectedShipment.message);
              }}
            >
              메시지 조회
            </button>
          </p>
          {cartList.map((v, i) => {
            const productData = allData.find(
              (data) => data.productCode === v.productCode
            );
            const imageUrl = productData
              ? `http://localhost:8090/product/photo/${productData.productPhoto}`
              : "";
            //일단 menu-item 클래로 css 임시로 설정해둠
            // src\Page\contentPage\categorypage\styles\popupcart.css <- 여기에 가면 해당 css 설정 있음
            return (
              <div className="menu-item" key={i}>
                <div className="product-image">
                  <img
                    src={imageUrl}
                    alt="상품이미지"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div
                  className="product-detail"
                  style={{ alignItems: "center" }}
                >
                  <div className="product-item">
                    {cTn[v.productCode]}
                    {/* 이부분 누르면 배열에서 삭제됨 */}
                    <br />
                    {/* cTn(codeToName) 넣은 이유 = 코드명 -> 제품이름으로 변환 */}
                    {v.sdrValue && `드레싱 :${cTn[v.sdrValue]}`}
                    <br />
                    {/* && 앞에 해당제품 있을때만 map 돌림 안쓰면 오류터짐 */}
                    {v.smtValue &&
                      `메인토핑 :${v.smtValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    {v.wmtValue &&
                      `메인토핑 :${v.wmtValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    <br />
                    {v.sstValue &&
                      `서브토핑 :${v.sstValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    {v.wstValue &&
                      `서브토핑 :${v.wstValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                    <br />
                    {v.ssmValue &&
                      `보조메뉴 :${v.ssmValue
                        .map((code) => cTn[code])
                        .join(", ")}`}
                  </div>
                </div>
                <div className="product-price">
                  {`수량 :${v.count}`}
                  <br />
                  {`가격 :${v.price}`}
                  <br />
                </div>
                <div className="delete">
                  <button onClick={() => delCart(i)}>x</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="purchase-margin">
        <div className="purchase-calculate">
          {auth.isLogined && <h2>예상 적립 마일리지:{point}</h2>}
          <table className="purchase-price">
            <tr>
              <td>총 상품 가격</td>
              <td>배송비</td>
              <td>최종금액</td>
            </tr>
            <tr className="tr2">
              <td>{totalCartPrice}원</td>
              <td>{shipfee === 0 ? "무료" : shipfee}</td>
              <td>{finalPrice}원</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="purchase-margin-button">
        <button className="go-to-check" onClick={regOrder}>
          구매 예약
        </button>
      </div>
    </div>
  );
};

export default Purchase;
