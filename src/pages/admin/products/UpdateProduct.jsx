import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar, Footer } from '../../../components';

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        inventory: '',
        color: '',
        file: null,
    });

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const data = await response.json();
            setProduct(data);
            setFormData({
                name: data.name,
                category: data.category,
                price: data.price,
                inventory: data.inventory,
                color: data.color.join(', '),
                file: null,
            });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataWithImage = new FormData();
            formDataWithImage.append('name', formData.name);
            formDataWithImage.append('category', formData.category);
            formDataWithImage.append('price', formData.price);
            formDataWithImage.append('inventory', formData.inventory);
            formDataWithImage.append('color', formData.color);
            if (formData.file) {
                formDataWithImage.append('file', formData.file);
            }

            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataWithImage,
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            navigate('/admin/products/show-products');

        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        setFormData({
            ...formData,
            file: event.target.files[0],
        });
    };

    const handleEditDiscounts = () => {
        navigate(`/admin/products/${id}/edit-discounts`);
    };

    const handleEditSpecifications = () => {
        if (formData.category === 'laptop') {
            navigate(`/admin/products/${id}/edit-specs/${formData.category}`);
        } else if (formData.category === 'tablet') {
            navigate(`/admin/products/${id}/edit-specs/${formData.category}`);
        } else if (formData.category === 'smartphone') {
            navigate(`/admin/products/${id}/edit-specs/${formData.category}`);
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <AdminNavbar />
            <div className="container mt-5 pb-5">
                <Card className="p-4">
                    <Card.Header>
                        <h5 className="mb-0">Edit Product: {product.name}</h5>
                    </Card.Header>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="inventory">
                            <Form.Label>Inventory</Form.Label>
                            <Form.Control
                                type="number"
                                name="inventory"
                                value={formData.inventory}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="color">
                            <Form.Label>Color (comma-separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="file">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='mt-4'>
                            Update Product
                        </Button>
                    </Form>
                    <Row className="mt-3">
                        <Col>
                            <Button variant="warning" onClick={handleEditDiscounts} className="me-1">
                                Edit Discounts
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="warning" onClick={handleEditSpecifications}>
                                Edit Specifications
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default UpdateProduct;