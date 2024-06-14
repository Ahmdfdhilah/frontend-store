import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartModal = ({ isOpen, toggle }) => {
  const cartItems = useSelector((state) => state.cart);

  return (
    <div className={`modal ${isOpen ? "d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Shopping Cart</h5>
            <button type="button" className="close" onClick={toggle}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="list-group">
                {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <div className="row">
                      <div className="col-8">
                        <h6>{item.name}</h6>
                        <p>Qty: {item.qty}</p>
                      </div>
                      <div className="col-4 text-right">
                        <p>Price: Rp. {item.price * item.qty}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal-footer">
            <Link to="/cart" className="btn btn-dark">
              Go to Cart
            </Link>
            <button type="button" className="btn btn-outline-dark" onClick={toggle}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
