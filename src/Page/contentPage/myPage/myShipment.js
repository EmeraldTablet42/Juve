import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyShipment = () => {
  const navi = useNavigate();
  const [shipmentDB, setShipmentDB] = useState([]);
  const getShipment = () => {
    if (sessionStorage.getItem("loginToken")) {
      axios
        .get(
          `http://localhost:8090/member/mypage/get.shipment.all?token=${sessionStorage.getItem(
            "loginToken"
          )}`
        )
        .then((res) => {
          // alert(JSON.stringify(res.data.shipments));
          setShipmentDB(res.data.shipments);
        })
        .catch(() => {
          alert("DB통신에러. 잠시 후 다시 시도해주세요.");
          navi(-1);
        });
    } else {
      alert("로그인 시간이 만료되었습니다. 로그인 후 다시 시도해주세요.");
      navi("/");
    }
  };

  const deleteShipment = (no) => {
    if (window.confirm("해당 배송지를 삭제하시겠습니까?")) {
      if (sessionStorage.getItem("loginToken")) {
        const fd = new FormData();
        fd.set("no", no);
        fd.set("token", sessionStorage.getItem("loginToken"));
        axios
          .post("http://localhost:8090/member/mypage/delete.shipment", fd)
          .then((res) => {
            // alert(res.data);
            getShipment();
          })
          .catch(() => {
            alert("DB통신에러 잠시 후 다시 시도해주세요.");
            window.location.reload();
          });
      } else {
        alert("로그인 정보가 만료되었습니다.");
        window.location.replace("/");
      }
    }
  };

  const updateShipment = (no) => {
    navi(`/member/mypage/myshipment/update?no=${no}`);
  };

  const shipmentTr = shipmentDB.map((v, i) => {
    const addr = v.address.split("^");
    return (
      <tr>
        <td>
          {v.isDefault === "Y" ? "[기본]" : ""}
          {v.destination}
        </td>
        <td>{v.name}</td>
        <td>{`[${addr[0]}] ${addr[1]} ${addr[2]}`}</td>
        <td>{v.phone}</td>
        <td>{v.tel.split("-")[1] && v.tel.split("-")[2] ? v.tel : ""}</td>
        <td>
          <button
            onClick={() => {
              updateShipment(v.no);
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              deleteShipment(v.no);
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  });

  const regShipment = () => {
    if (shipmentDB.length >= 5) {
      alert("최대 5개의 배송지만 등록할 수 있습니다.");
    } else {
      navi("/member/mypage/myshipment/add");
    }
  };

  useEffect(() => {
    getShipment();
  }, []);

  return (
    <>
      <div className="titleArea">
        <h2 style={{ display: "inline-block" }}>배송지관리</h2>
        <p style={{ display: "inline-block" }}>
          최대 5개의 배송지를 등록하실 수 있습니다.
        </p>
      </div>
      <div className="shipmentTblDiv">
        <table border={1} className="shipmentTbl">
          <tr>
            <th>배송지명</th>
            <th>수령인</th>
            <th>주소</th>
            <th>휴대전화</th>
            <th>일반전화</th>
            <th>수정</th>
          </tr>
          {shipmentTr}
        </table>
        <button onClick={regShipment}>배송지 등록</button>
      </div>
    </>
  );
};

export default MyShipment;
