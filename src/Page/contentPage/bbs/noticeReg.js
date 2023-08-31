import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./ckeditor5.css";

const NoticeReg = () => {
  const [editorData, setEditorData] = useState("");
  return (
    <>
      <h2>공지사항 등록</h2>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
      />
      <button
        onClick={() => {
          alert(editorData);
        }}
      >
        내용확인
      </button>
    </>
  );
};

export default NoticeReg;
