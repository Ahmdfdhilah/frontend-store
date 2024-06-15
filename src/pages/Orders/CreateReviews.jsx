import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer, Navbar } from '../../components';

const ReviewProduct = () => {
  const { orderItemId, productId, orderId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');
    const reviewData = {
      rating,
      comment,
      productId,
      orderItemId,
      userId: localStorage.getItem('userId'),
    };

    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3000/products/product-reviews`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Review created:', response.data);
      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error('Error creating review:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!rating || rating < 1 || rating > 5) {
      errors.rating = 'Rating must be between 1 and 5.';
    }

    if (!comment.trim()) {
      errors.comment = 'Comment is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Product Review</h1>
        <div className="mb-3">
          <h3>{product.name}</h3>
          <img src={product.imgSrc} alt={product.name} className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating:
            </label>
            <select
              className={`form-select ${errors.rating ? 'is-invalid' : ''}`}
              id="rating"
              value={rating}
              onChange={handleRatingChange}
              required
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment:
            </label>
            <textarea
              className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
              id="comment"
              rows="3"
              value={comment}
              onChange={handleCommentChange}
              required
            ></textarea>
            {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit Review
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ReviewProduct;