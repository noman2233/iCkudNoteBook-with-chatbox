import React from "react";
import "./comments.css";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Reviews = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      axios.get(`/users/getreview/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      <div className="review_sub">
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="user review_user">
            <img
              className="pp"
              src={
                data.img ||
                "https://img.freepik.com/premium-vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol-neumorphic-ui-ux-white-user-interface-web-button-neumorphism-vector-eps-10_399089-2757.jpg?w=740"
              }
              alt=""
              width="40px"
              height="40px"
            />
            <div className="info">
              <b className="name">{data.name} </b>
            </div>
          </div>
        )}
        <div className="stars">
          {Array(review.star)
            .fill()
            .map((item, i) => (
              <StarPurple500OutlinedIcon key={i} className="stars" />
            ))}
          <span>{review.star}</span>
        </div>
      </div>
      <p>
        <b>Review : </b> {review.desc}
      </p>
    </div>
  );
};

export default Reviews;
