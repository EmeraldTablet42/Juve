import axios from "axios";
import React, { useEffect, useState } from "react";

function IdValidation() {
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8090/member/getIds").then((res) => {
      setIdList(res.data);
    });
  }, []);

  return idList;
}

export default IdValidation;
