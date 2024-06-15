import React from 'react';
import { Footer, Navbar } from "../components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends, faLightbulb, faHandshake, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import '../css/about.css';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <div className="container my-5 py-4">
            <div className="row mb-4">
              <div className="col-md-12">
                <h1 className="text-center mb-4">About Trust Gadget Shop</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="lead">
                  Welcome to Trust Gadget Shop, your ultimate destination for the latest gadgets and accessories. Established in 20XX, Trust Gadget Shop has been at the forefront of technology retail, offering a diverse range of high-quality products from top-tier brands like Apple, Samsung, Xiaomi, Huawei, and Dell.
                </p>
                <p>
                  Our journey began with a passion for technology and a commitment to providing customers with cutting-edge products that enhance their digital lifestyles. Over the years, Trust Gadget Shop has earned a reputation for reliability, trustworthiness, and excellence in customer service.
                </p>
                <p>
                  At Trust Gadget Shop, we understand that technology evolves rapidly. That's why we continuously update our product offerings to reflect the latest advancements in smartphones, laptops, and accessories. Whether you're a tech enthusiast, professional, or everyday consumer, we have something for everyone.
                </p>
              </div>
              <div className="col-md-6">
                <div className="card bg-light border-0 shadow-sm p-3">
                  <h5 className="mb-3">Why Choose Us?</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3"><FontAwesomeIcon icon={faLightbulb} className="me-2 text-success" /> Innovative product selection</li>
                    <li className="mb-3"><FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" /> High standards of product quality</li>
                    <li className="mb-3"><FontAwesomeIcon icon={faHandshake} className="me-2 text-success" /> Commitment to customer satisfaction</li>
                    <li className="mb-3"><FontAwesomeIcon icon={faBalanceScale} className="me-2 text-success" /> Ethical business practices</li>
                    <li className="mb-3"><FontAwesomeIcon icon={faUserFriends} className="me-2 text-success" /> Strong community relationships</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h5 className="mb-3">Our Mission</h5>
                <p>
                  Trust Gadget Shop is dedicated to providing our customers with superior technological solutions that enhance their daily lives. We strive to maintain our position as a trusted leader in the gadget industry by offering cutting-edge products and exceptional customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
