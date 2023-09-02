import React, { useState } from "react";
import { useSelector } from "react-redux";

const Review = () => {
  const addedMenus = useSelector((state) => state.menu);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleReviewSubmit = () => {
    if (newReview.trim() !== "") {
      setReviews([...reviews, newReview]);
      setNewReview("");
    }
  };

  return (
    <div className="review-board">
      <h2 style={{ textAlign: "center" }}>리뷰 작성 게시판</h2>
      <div className="review-form" style={{ alignItems: "center" }}>
        <textarea
          value={newReview}
          onChange={handleReviewChange}
          placeholder="리뷰를 작성해주세요."
          style={{ width: "1200px", height: "200px" }}
        />
        <div
          className="btn"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button onClick={handleReviewSubmit} style={{ width: "200px" }}>
            리뷰 작성
          </button>
        </div>
      </div>
      <div className="review-list">
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <table
          style={{
            width: "1200px",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <th>리뷰 확인하기</th>
            </tr>
            {reviews.map((review, index) => (
              <tr key={index} style={{ height: "200px" }}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Review;
