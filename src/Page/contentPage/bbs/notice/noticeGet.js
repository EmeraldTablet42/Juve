import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import Editor from "ckeditor5-custom-build";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const NoticeGet = () => {
  const navi = useNavigate();
  const [searchParams] = useSearchParams();
  const [bbsDB, setBbsDB] = useState({});
  const auth = useSelector((state) => state.authindex);
  const getBoard = () => {
    axios
      .get(`http://localhost:8090/bbs/getById?id=${searchParams.get("id")}`)
      .then((res) => {
        const datePart = res.data.date.split("T")[0];
        const timePart = res.data.date
          .split("T")[1]
          .split(":")
          .slice(0, 2)
          .join(":");
        const formattedDateTime = `${datePart} ${timePart}`;
        setBbsDB({ ...res.data, date: formattedDateTime });
      })
      .catch(() => {
        alert("DB통신에러. 잠시 후 다시 시도해주세요");
        navi("/");
      });
  };
  const deleteBoard = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .get(`http://localhost:8090/bbs/delete.bbs?no=${bbsDB.no}`)
        .then(() => {
          navi("/board/notice/list");
        })
        .catch(() => {
          alert("DB통신에러 삭제 실패");
        });
    }
  };

  // 날짜와 시간 형식 변경

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      <h2>공지사항</h2>
      <table width="100%" border={1}>
        <tr>
          <th colSpan={6}>{bbsDB.title}</th>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{bbsDB.writerName}</td>
          <th>작성일</th>
          <td>{bbsDB.date}</td>
          <th>조회수</th>
          <td>{bbsDB.hits}</td>
        </tr>
        <tr>
          <td colSpan={6}>
            <CKEditor
              editor={Editor}
              data={bbsDB.context}
              config={{ toolbar: [""] }}
              disabled
            />
          </td>
          {/* <td colSpan={6}>{bbsDB.context && Parser(bbsDB.context)}</td> */}
        </tr>
        <tr>
          <td align="left">
            {auth.memberId === "adminjuve" && (
              <>
                <button
                  onClick={() => {
                    navi(`/board/notice/update?id=${bbsDB.no}`);
                  }}
                >
                  수정
                </button>
                <button onClick={deleteBoard}>삭제</button>
              </>
            )}
          </td>
          <td align="right" colSpan={5}>
            <button
              onClick={() => {
                navi("/board/notice/list");
              }}
            >
              목록
            </button>
          </td>
        </tr>
      </table>
    </>
  );
};

export default NoticeGet;
