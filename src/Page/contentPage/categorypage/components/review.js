import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../bbs/ckeditor5.css";
import sampleimage from "../static/sal1.jpg"
import Editor from "ckeditor5-custom-build";
import Parser from "html-react-parser";
const Review = () => {
  const [editorData, setEditorData] = useState("");
  const [review, setReview] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);

    setIsButtonDisabled(data.trim() === "");
  };
  const handleReviewCheck = () => {
    const newReview = {
      id: Date.now(), 
      photo:sampleimage,
      content: editorData, 
    };

    setReview([...review, newReview]);
    setEditorData("");
    setIsButtonDisabled(true);
  };
  return (
    <>
    <div>
      <h2>리뷰 등록</h2>
      <CKEditor
        editor={Editor}
        data={editorData}
        onChange={handleEditorChange}
      />
      </div>
      <button onClick={handleReviewCheck} disabled={isButtonDisabled}>리뷰작성</button>
      <div>
        {review.map((review) => (
          <div key={review.id}>
            <h3>리뷰 ID: {review.id}</h3>
            <img src={sampleimage} alt="상품이미지" style={{width:"100px", height:"100px"}}/>
            <p>{Parser(review.content)}</p>
          </div>
        ))}
      </div>
        </>
  );
};

export default Review;
