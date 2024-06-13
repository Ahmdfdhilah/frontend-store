import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-3">
            <h5 className="mb-3"><a href="https://www.google.com/maps/search/?api=1&query=Jl.+Address+No.+123%2C+Jakarta%2C+Indonesia" className="text-dark text-decoration-none">Our Address</a></h5>
            <p>Jl. Address No. 123, Jakarta<br />Indonesia</p>
          </div>
          <div className="col-md-3">
            <a href="/terms-conditions" className="text-dark text-decoration-none"><h5 className="mb-3">Terms and Conditions</h5></a>
            <p>These terms and conditions outline the rules and regulations for the use of Trust's Website and Services.</p>
          </div>
          <div className="col-md-3">
            <h5 className="mb-3">Contact Person</h5>
            <p>Email: contact@example.com<br />Phone: +123456789</p>
            <div>
              <a href="/" className="text-white me-2"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="/" className="text-white me-2"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="/" className="text-white"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
          <div className="col-md-3">
            <h5 className="mb-3">Payment Methods Accepted</h5>
            <div className="d-flex align-items-center">
              <img src="/img/visa.png" alt="Visa" className="me-3 img-fluid" style={{ maxWidth: "80px" }} />
              <img src="/img/mastercard.png" alt="MasterCard" className="me-3 img-fluid" style={{ maxWidth: "80px" }} />
              <img src="/img/bni.png" alt="bni" className="me-3 img-fluid" style={{ maxWidth: "50px" }} />
              <img src="/img/dana.png" alt="bni" className="me-3 img-fluid" style={{ maxWidth: "50px" }} />
              <img src="/img/bri.png" alt="bni" className="me-3 img-fluid" style={{ maxWidth: "50px" }} />
              <img src="/img/bca.png" alt="bni" className="me-3 img-fluid" style={{ maxWidth: "50px" }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h5 className="mb-3">Featured Brands</h5>
            <div className="d-flex align-items-center">
              <img src="/img/apple.png" alt="Apple" className="me-3 img-fluid" style={{ maxWidth: "80px" }} />
              <img src="/img/samsung.png" alt="Samsung" className="me-3 img-fluid" style={{ maxWidth: "80px" }} />
              <img src="/img/xiaomi.png" alt="Samsung" className="me-3 img-fluid" style={{ maxWidth: "80px" }} />
              <img src="/img/huawei.png" alt="Samsung" className="me-3 img-fluid" style={{ maxWidth: "80px" }} />
              <img src="/img/dell.png" alt="Samsung" className="me-3 img-fluid" style={{ maxWidth: "80px" }} />
            </div>
          </div>
          <div className="col-md-6">
            {/* Empty column */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;