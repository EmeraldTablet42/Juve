import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useSelector } from "react-redux";

const NoticeListGet = () => {
  const [params, setParams] = useState({
    page: 1,
    type: "NTC",
    search: "",
  });
  const [bbsDB, setBbsDB] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [searchInput, setSearchInput] = useState("");
  const auth = useSelector((state) => state.authindex);

  const regNotice = () => {
    window.location.replace("/board/notice/reg");
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
        <a href={`/board/notice/get?id=${v.no}`}>{v.title}</a>
      </td>
      <td>{v.writerName}</td>
      <td>{v.date}</td>
      <td>{v.hits}</td>
    </tr>
  ));

  return (
    <>
      <h2>공지사항</h2>
      <table className="BBSNoticeTbl" border={1}>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회</th>
        </tr>
        {bbsTr}
        {auth.memberId === "adminjuve" && (
          <tr>
            <td colSpan={5}>
              <button onClick={regNotice}>공지사항 등록</button>
            </td>
          </tr>
        )}
      </table>
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

export default NoticeListGet;
