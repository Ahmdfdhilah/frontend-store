import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Footer, Navbar } from "../../components";
import '../../css/about.css';

const FAQSection = () => {
    return (
        <>
            <Navbar />
            <section className="py-5 faq-container">
                <Container>
                    <h3 className="text-center mb-4 pb-2 text-secondary fw-bold">FAQ</h3>
                    <p className="text-center mb-5">
                        Find answers to frequently asked questions about Trust, your trusted gadget shop.
                    </p>

                    <Row>
                        <Col md={6} lg={4} className="mb-4">
                            <div className="text-secondary mb-3"><i className="far fa-question-circle text-secondary pe-2"></i> How can I track my order?</div>
                            <p>
                                <strong><u>You can easily track your order</u></strong> through your Trust account dashboard or by using the tracking link provided in your confirmation email.
                            </p>
                        </Col>

                        <Col md={6} lg={4} className="mb-4">
                            <div className="text-secondary mb-3"><i className="fas fa-shipping-fast text-secondary pe-2"></i> What are your shipping options?</div>
                            <p>
                                <strong><u>We offer various shipping options</u></strong> depending on your location and the urgency of your order. You can choose standard delivery or expedited shipping during checkout.
                            </p>
                        </Col>

                        <Col md={6} lg={4} className="mb-4">
                            <div className="text-secondary mb-3"><i className="far fa-credit-card text-secondary pe-2"></i> What payment methods do you accept?</div>
                            <p>
                                We accept payments via Visa, MasterCard, BNI, Dana, BRI, and BCA. All transactions are secure and encrypted for your protection.
                            </p>
                        </Col>

                        <Col md={6} lg={4} className="mb-4">
                            <div className="text-secondary mb-3"><i className="fas fa-exchange-alt text-secondary pe-2"></i> Can I return or exchange a product?</div>
                            <p>
                                <strong><u>Yes, you can</u></strong>! We offer a [number]-day return policy for unused products in their original packaging. Please refer to our Returns Policy for detailed instructions.
                            </p>
                        </Col>

                        <Col md={6} lg={4} className="mb-4">
                            <div className="text-secondary mb-3"><i className="fas fa-shield-alt text-secondary pe-2"></i> Is my payment information secure?</div>
                            <p>
                                <strong><u>Your payment security is our priority</u></strong>. We partner with top payment companies to ensure all billing information is securely stored and processed.
                            </p>
                        </Col>

                        <Col md={6} lg={4} className="mb-4">
                            <div className="text-secondary mb-3"><i className="fas fa-user-lock text-secondary pe-2"></i> How do you protect my personal information?</div>
                            <p>
                                We adhere to strict data protection regulations. Your personal information is encrypted and handled with utmost confidentiality. Please review our Privacy Policy for more details.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default FAQSection;