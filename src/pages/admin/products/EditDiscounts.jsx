import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminNavbar, Footer } from '../../../components';
import { Card, CardBody } from 'react-bootstrap';

const EditDiscounts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [discount, setDiscount] = useState({
        discount: '',
        expires_at: ''
    });
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                const data = await response.json();
                setProduct(data);
                if (data.discounts) {
                    setDiscount({
                        discount: data.discounts.discount || '',
                        expires_at: data.discounts.expires_at ? new Date(data.discounts.expires_at).toISOString().split('T')[0] : ''
                    });
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiscount((prevDiscount) => ({
            ...prevDiscount,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    discounts: discount
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update discounts');
            }
            navigate(`/admin/products/update-product/${id}`);
        } catch (error) {
            console.error('Error updating discounts:', error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container mt-5 py-5">
                <Card>
                    <Card.Header>
                        <h5 className="mb-0">Edit Discount</h5>
                    </Card.Header>
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="discount" className="form-label">Discount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="discount"
                                    name="discount"
                                    value={discount.discount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expires_at" className="form-label">Expires At</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="expires_at"
                                    name="expires_at"
                                    value={discount.expires_at}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update Discount</button>
                        </form>
                    </CardBody>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default EditDiscounts;