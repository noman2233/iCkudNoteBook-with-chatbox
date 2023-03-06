import React from "react";
import "./Customers.css";
const Customers = () => {
  return (
    <>
      <div className="main-gallery-heading">
        <h2>Happy users</h2>
      </div>
      <div className="categories">
        <div className="col">
          <div className="row1">
            <img
              src="https://cdn.pixabay.com/photo/2016/03/27/19/57/woman-1284029__340.jpg"
              alt=""
              className="category_row1"
            />
            <h4>James</h4>
            <p>
              One of the best and safest option for taking notes and storing on
              internet.
            </p>
          </div>
          <div className="row1">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/02/20/25/woman-2112292__340.jpg"
              alt=""
              className="category_row1"
            />
            <h4>Alisa John</h4>
            <p>
              My favourite wesites are and I Love pushing my notes on cloud.
            </p>
          </div>
        </div>
        <div className="col2">
          <div className="row2">
            <img
              src="https://cdn.pixabay.com/photo/2017/11/02/14/27/model-2911332__340.jpg"
              alt=""
              className="category_row2"
            />
            <h4>Lama Dev</h4>
            <p>
              We're so happy to hear we're one of your favourite sites! We hope
              you find it really useful and have fun learning English , and
              storing notes and also having chat with friends.
            </p>
          </div>
        </div>
        <div className="col3">
          <div className="main_row3">
            <div className="row3">
              <img
                src="https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="category_row1"
              />
              <h4>John doe</h4>
              <p>Store notes and have access to it antime from anywhere </p>
            </div>
            <div className="row3">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/02/14/36/model-2911363__340.jpg"
                alt=""
                className="category_row1"
              />
              <h4>Mat Parker</h4>
              <p>
                My favourite wesites are and I Love pushing my notes on cloud.
              </p>
            </div>
          </div>
          <div className="row3_large">
            <div className="one__box">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxdK4GRL3vgubOIijabP0gpqzaoBBtpjKs7g&usqp=CAU"
                alt=""
                className="category_row1"
              />
              <h4>Jameson</h4>
              <p>
                In this kind of website I also have for useful. For instance
                when I am bored I read notes of diifernt users and learn
                something new and just relax.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
