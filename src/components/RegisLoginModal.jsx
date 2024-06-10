import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // You can use any modal component, this example uses react-bootstrap

const RegisLoginModal = ({ show, handleClose, title, message }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegisLoginModal;
