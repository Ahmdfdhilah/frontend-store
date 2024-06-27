import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { AdminNavbar, Footer } from '../../../components';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    inventory: '',
    color: '',
    weight: '',
    imgSrc: ''
  });
  const [file, setFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [fileError, setFileError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        imgSrc: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('inventory', product.inventory);
        formData.append('color', product.color);
        formData.append('weight', product.weight);
        if (file) {
          formData.append('file', file);
        }

        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to create product');
        }
        navigate('/admin/products');
      } catch (error) {
        console.error('Error creating product:', error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!product.name) {
      formIsValid = false;
      errors['name'] = 'Name is required';
    }

    if (!product.category) {
      formIsValid = false;
      errors['category'] = 'Category is required';
    }

    if (!product.price) {
      formIsValid = false;
      errors['price'] = 'Price is required';
    }

    if (!product.inventory) {
      formIsValid = false;
      errors['inventory'] = 'Inventory is required';
    }

    if (!product.color) {
      formIsValid = false;
      errors['color'] = 'Color is required';
    }

    if (!product.weight) {
      formIsValid = false;
      errors['weight'] = 'Weight is required';
    }

    if (!file) {
      formIsValid = false;
      setFileError('Please select a product image');
    } else {
      setFileError('');
    }

    setValidationErrors(errors);
    return formIsValid;
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5 pb-5">
        <Card>
          <Card.Header>
            <h5 className="mb-0">Create Product</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} isInvalid={!!fileError} />
                <Form.Control.Feedback type="invalid">
                  {fileError}
                </Form.Control.Feedback>
                {product.imgSrc && (
                  <img src={product.imgSrc} alt="Product Preview" className="mt-2" style={{ maxWidth: '200px' }} />
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  isInvalid={validationErrors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  isInvalid={validationErrors.category}
                >
                  <option value="">Select Category</option>
                  <option value="laptop">Laptop</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  isInvalid={validationErrors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formInventory">
                <Form.Label>Inventory</Form.Label>
                <Form.Control
                  type="number"
                  name="inventory"
                  value={product.inventory}
                  onChange={handleChange}
                  isInvalid={validationErrors.inventory}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.inventory}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formColor">
                <Form.Label>Color (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={product.color}
                  onChange={handleChange}
                  isInvalid={validationErrors.color}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.color}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="text"
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  isInvalid={validationErrors.weight}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.weight}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Product
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default CreateProduct;