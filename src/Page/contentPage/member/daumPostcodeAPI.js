import React from "react";
import DaumPostcode from "react-daum-postcode";
import "./join.css";

const DaumPostcodeAPI = (props) => {
  const handleComplete = (data) => {
    let fulladdress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `,${data.buildingName}` : data.buildingName;
      }
      fulladdress += extraAddress !== "" ? `(${extraAddress})` : "";
    }

    console.log(fulladdress);
    console.log(data.zonecode);
    props.setAddr({
      ...props.Addr,
      addr1: data.zonecode,
      addr2: fulladdress,
      addr3:"",
    });
    props.setAddrPopup(false);
    props.setIsAllValidate({
      ...props.isAllValidate,
      address: Boolean(data.zonecode),
    });
  };

  return (
    <DaumPostcode
      className="postmodal1"
      autoClose={false}
      onComplete={handleComplete}
      style={{ height: "70%", width: "30%", border: "1px solid black" }}
    />
  );
};

export default DaumPostcodeAPI;
