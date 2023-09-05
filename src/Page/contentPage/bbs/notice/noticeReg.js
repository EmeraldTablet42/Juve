import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import Editor from "ckeditor5-custom-build";
import React, { useEffect, useState } from "react";
import "../ckeditor5.css";
import uuid from "react-uuid";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const NoticeReg = () => {
  const auth = useSelector((state) => state.authindex);
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState("Y");
  const [writerName, setWriterName] = useState("");
  const [writerId, setWriterId] = useState("");
  const [context, setContext] = useState("");
  const [imgUploaded, setImgUploaded] = useState([]);
  const [ckId, setCkId] = useState("");

  const handleIsPublic = (e) => {
    e.target.checked ? setIsPublic("N") : setIsPublic("Y");
  };

  useEffect(() => {
    sessionStorage.setItem("checkUUID", uuid());
    getIdInfo();
  }, []);

  const getIdInfo = () => {
    axios
      .get(`http://localhost:8090/member.getById?id=${auth.memberId}`)
      .then((res) => {
        if (res.data.id !== "adminjuve") {
          alert("잘못된 접근입니다.");
          navi("/");
        } else {
          alert(JSON.stringify(res.data));
          setWriterName(res.data.name);
          setWriterId(res.data.id);
        }
      });
  };

  const editorConfiguration = {
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "alignment",
      "fontSize",
      "fontFamily",
      "bold",
      "italic",
      "underline",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "blockQuote",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "horizontalLine",
      "findAndReplace",
      "insertTable",
      "|",
      "imageInsert",
      "mediaEmbed",
      "link",
    ],
    extraPlugins: [MyCustomUploadAdapterPlugin],
    // simpleUpload: {
    //   // The URL that the images are uploaded to.
    //   uploadUrl: "http://localhost:8090/bbs/upload.photo",
    //   // Enable the XMLHttpRequest.withCredentials property.
    //   withCredentials: true,
    //   headers: {
    //     "User-ID": "test", // 추가할 사용자 ID
    //     "BBS-ID": bbsID,
    //   },
    // },
  };

  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.set("upload", file);

            axios
              .post("http://localhost:8090/bbs/upload.photo", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                alert(response.data.url);
                if (response.data && response.data.url) {
                  resolve({
                    default:
                      "http://localhost:8090/bbs/photo/" + response.data.url,
                  });
                  setImgUploaded((prevImgUploaded) => [
                    ...prevImgUploaded,
                    String(response.data.url),
                  ]);
                } else {
                  reject("이미지 업로드에 실패하였습니다.");
                }
              })
              .catch(reject);
          })
      );
    }

    abort() {
      // Axios abort logic here
    }
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  const checkFill = () => {
    if (!title) {
      alert("제목을 입력해주세요");
      return false;
    }
    if (!context) {
      alert("본문을 입력해주세요!");
      return false;
    }
    return true;
  };

  const regNotice = () => {
    if (!checkFill()) {
      return;
    }
    if (
      sessionStorage.getItem("successUUID") !== null &&
      sessionStorage.getItem("checkUUID") ===
        sessionStorage.getItem("successUUID")
    ) {
      alert("글쓰기 실패. 새로고침 금지");
      navi("/board/notice/get");
      return;
    }
    const fd = new FormData();
    fd.set("type", "NTC");
    fd.set("writerName", writerName);
    fd.set("writerId", writerId);
    fd.set("title", title);
    fd.set("isPublic", isPublic);
    fd.set("context", context);
    fd.set("date", new Date());
    fd.set("photos", imgUploaded);
    fd.set("hits", 0);

    axios
      .post("http://localhost:8090/bbs/reg.bbs", fd)
      .then((res) => {
        alert(JSON.stringify(res.data));
        sessionStorage.setItem(
          "successUUID",
          sessionStorage.getItem("checkUUID")
        );
        navi("/board/notice/list");
      })
      .catch(() => {
        alert("DB통신 에러. 잠시 후 다시 시도해주세요.");
      });
  };

  return (
    <>
      <h2>공지등록</h2>
      제목:
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      비공개 :{" "}
      <input type="checkbox" value={isPublic} onChange={handleIsPublic} />
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data=""
        onReady={(editor) => {
          setCkId(editor.id);
        }}
        onChange={(event, editor) => {
          setContext(editor.getData());
          // alert(editor.data.listenTo);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <button onClick={regNotice}>등록</button>
      <button>취소</button>
      <button
        onClick={() => {
          alert(sessionStorage.getItem("checkUUID"));
        }}
      >
        chk확인
      </button>
      <button
        onClick={() => {
          alert(context);
        }}
      >
        data 확인
      </button>
      <button
        onClick={() => {
          alert(sessionStorage.getItem("successUUID"));
        }}
      >
        suc확인
      </button>
      <button
        onClick={() => {
          alert(JSON.stringify(imgUploaded));
        }}
      >
        업로드된 이미지 확인
      </button>
    </>
  );
};

export default NoticeReg;
