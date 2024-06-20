import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import "../css/about.css"; 
import FloatingFAQButton from "../components/FAQButton";

const TermsConditionsPage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <>
      <Navbar />
      <div className="py-4 terms-container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="terms-content">
              <h2 className="text-center mb-4">Terms and Conditions</h2>
              <p>
                Welcome to Trust, your trusted gadget shop! These terms and
                conditions outline the rules and regulations for the use of
                Trust's Website and Services.
              </p>

              <h3 className="mt-5">1. General</h3>
              <p>
                1.1. The following terminology applies to these Terms and
                Conditions, Privacy Statement, and Disclaimer Notice and any or
                all Agreements: "Client," "You," and "Your" refers to you, the
                person accessing this website and accepting the Company's terms
                and conditions. "The Company," "Ourselves," "We," "Our," and
                "Us," refers to our Company. "Party," "Parties," or "Us," refers
                to both the Client and ourselves, or either the Client or
                ourselves.
              </p>

              <h3 className="mt-5">2. Products and Services</h3>
              <p>
                2.1. Trust offers a range of gadgets, accessories, and related
                services subject to availability.
              </p>
              <p>2.2. Prices for products are subject to change without notice.</p>
              <p>
                2.3. We reserve the right, but are not obligated, to limit the
                sales of our products or services to any person, geographic
                region, or jurisdiction. We may exercise this right on a
                case-by-case basis.
              </p>

              <h3 className="mt-5">3. Orders and Payments</h3>
              <p>
                3.1. By placing an order with Trust, you are offering to purchase
                a product and subject to availability. We will confirm acceptance
                of your order via email.
              </p>
              <p>3.2. Payment must be received in full before the order is dispatched.</p>
              <p>
                3.3. We accept payments via Visa, MasterCard, BNI, Dana, BRI, and
                BCA. All credit/debit cardholders are subject to validation
                checks and authorization by the card issuer.
              </p>

              <h3 className="mt-5">4. Shipping and Delivery</h3>
              <p>
                4.1. Shipping costs are calculated during checkout based on the
                shipping destination and chosen shipping method.
              </p>
              <p>
                4.2. We aim to dispatch orders within [number] business days.
                Delivery times may vary depending on the shipping method and
                location.
              </p>
              <p>
                4.3. Trust is not responsible for delays caused by unforeseen
                circumstances or third-party carriers.
              </p>

              <h3 className="mt-5">5. Returns and Refunds</h3>
              <p>
                5.1. We offer a [number]-day return policy for unused products in
                their original packaging. Please refer to our Returns Policy for
                detailed instructions.
              </p>
              <p>
                5.2. Refunds will be processed within [number] business days upon
                receipt and inspection of returned products.
              </p>

              <h3 className="mt-5">6. Privacy Policy</h3>
              <p>
                6.1. Your privacy is important to us. Please review our Privacy
                Policy to understand how we collect, use, and safeguard your
                personal information.
              </p>

              <h3 className="mt-5">7. Governing Law</h3>
              <p>
                7.1. These Terms and Conditions shall be governed by and construed
                in accordance with the laws of [Your Country], and any disputes
                relating to these terms and conditions will be subject to the
                exclusive jurisdiction of the courts of [Your City/Country].
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingFAQButton />
    </>
  );
};

export default TermsConditionsPage;
