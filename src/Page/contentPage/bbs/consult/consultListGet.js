import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useSelector } from "react-redux";
import "./consultlist.css";
const ConsultListGet = () => {
  const [params, setParams] = useState({
    page: 1,
    type: "CST",
    search: "",
  });
  const [bbsDB, setBbsDB] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [searchInput, setSearchInput] = useState("");
  const auth = useSelector((state) => state.authindex);

  const regConsult = () => {
    window.location.replace("/board/consult/reg");
  };
  const handlePageChange = (pagee) => {
    setParams({ ...params, page: pagee });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const doSearch = (e) => {
    if (e.key === "Enter") {
      setParams({ ...params, page: 1, search: searchInput });
    }
  };

  const addHits = (v) => {
    axios.post(`http://localhost:8090/bbs/addHits?no=${v.no}`).catch(() => {
      alert("DB통신 오류");
    });
  };

  useEffect(() => {
    getBBS();
  }, [params]);

  const getBBS = () => {
    // alert(page);
    // alert(searchParam);
    axios
      .get(
        // `http://localhost:8090/product.getByPage?page=${params.page}&category=${params.category}&price=${params.price}&search=${params.search}`
        `http://localhost:8090/bbs/getByTypeAndPage?page=${params.page}&type=${params.type}&search=${params.search}`
      )
      .then((res) => {
        //   alert(JSON.stringify(res.data.products));
        setBbsDB(res.data.bbsList);
        setTotalPage(res.data.totalPage);
      });
  };

  const bbsTr = bbsDB.map((v, i) => (
    <tr>
      <td>{bbsDB.length - i}</td>
      <td
        onClick={() => {
          addHits(v);
        }}
      >
        <a href={`/board/consult/get?id=${v.no}`}>{v.title}</a>
      </td>
      <td>{v.writerName}</td>
      <td>{v.date.split("T")[0]}</td>
      <td>{v.hits}</td>
    </tr>
  ));

  return (
    <>
      <div className="consult-title">
        <div>
          <h2>고객문의</h2>
        </div>
      </div>
      <div className="tableset">
        <div>
          <table className="BBSConsultTbl" border={1}>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
            </tr>
            {bbsTr}
            <tr>
              <td colSpan={5}></td>
            </tr>
          </table>
          </div>
          <div className="consult-write">
            <button onClick={regConsult}>글쓰기</button>
          </div>
      </div>
      <div>
        <Pagination
          activePage={params.page}
          itemsCountPerPage={1}
          totalItemsCount={totalPage}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
      <div className="pg_Search">
        <input
          value={searchInput}
          onChange={handleSearchInput}
          onKeyDown={doSearch}
        />
      </div>
    </>
  );
};

export default ConsultListGet;
