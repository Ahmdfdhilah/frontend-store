import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navivate = useNavigate();

  const handleSubmit = () => {
    navivate('/product')
  }
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.jpg"
            alt="Trust Gadget Shop"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container text-center text-sm-start">
              <h1 className="card-title fs-1 text-light fw-bold mb-3">Welcome to T.rust Shop</h1>
              <p className="card-text fs-5 text-light">
                Discover the latest gadgets and accessories from top brands like Apple, Samsung, Xiaomi, Huawei, and Dell.
              </p>
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
