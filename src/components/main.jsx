import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/product');
  };

  return (
    <div className="card text-white border-0 mx-3 p-5">
      <div className="card-body p-0">
        <img
          className="card-img img-fluid"
          src="./assets/homebg.png"
          alt="Trust Gadget Shop"
        />
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container text-center text-sm-start">
            <h1 className="card-title fs-1 text-black fw-bold mb-3">Welcome to T.rust Shop</h1>
            <p className="card-text fs-5 text-black w-50">
              Discover the latest gadgets and accessories from top brands like Apple, Samsung, Xiaomi, Huawei, and Dell.
            </p>
            <button className="btn btn-dark mt-3" onClick={handleSubmit}>Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;