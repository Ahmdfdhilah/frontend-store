import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, Table, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar, Footer } from '../../../components';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true) // Filter by selected category
  );

  const handleUpdate = (product) => {
    navigate(`/admin/products/update-product/${product.id}`);
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h1 className="mb-4">Product List</h1>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this product?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleRemove(selectedProduct.id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Card>
          <Card.Header>
            <h5 className="mb-0">Products</h5>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="primary" id="dropdown-category">
                {selectedCategory ? `Category: ${selectedCategory}` : 'Select Category'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategorySelect('')}>All Categories</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('laptop')}>Laptop</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('smartphone')}>Smartphone</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('tablet')}>Tablet</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Table striped bordered hover responsive>
              <thead className="table-header">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Color</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center">Loading...</td>
                  </tr>
                ) : (
                  filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct).map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.imgSrc} alt={product.name} style={{ width: '50px', height: '50px' }} />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price.toLocaleString()} IDR</td>
                      <td>{product.inventory}</td>
                      <td>{product.color.join(', ')}</td>
                      <td>
                        <Button variant="warning" size="sm" className="m-1" onClick={() => handleUpdate(product)}>
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </Button>
                        <Button variant="danger" size="sm" className="m-1" onClick={() => handleShowModal(product)}>
                          <FontAwesomeIcon icon={faTrashAlt} /> Remove
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center">
              <ul className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;