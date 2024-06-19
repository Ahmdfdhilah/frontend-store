import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FAQButton, Footer, Navbar } from '../../components';

const UpdateReviews = () => {
  const { reviewId, productId, orderId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    const fetchReview = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/products/product-reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setRating(response.data.rating);
        setComment(response.data.comment);
      } catch (error) {
        console.error('Error fetching review details:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }

    if (reviewId) {
      fetchReview();
    }
  }, [productId, reviewId]);

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
    };

    try {
      setLoading(true);
      await axios.put(`http://localhost:3000/products/product-reviews/${reviewId}`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Review updated successfully');
      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error('Error updating review:', error);
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

  const renderSkeleton = () => (
    <div className="container">
      <h1 className="my-4">Loading product details...</h1>
      <div className="mb-3">
        <div className="placeholder-glow">
          <span className="placeholder col-6"></span>
        </div>
        <div className="placeholder-glow">
          <span className="placeholder col-12" style={{ height: '200px', display: 'block' }}></span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (!product) {
    return <div className="container">Product details not available.</div>;
  }

  // Function to render star icons based on rating
  const renderStarIcons = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className="star"
          style={{ color: i <= rating ? 'gold' : 'grey', cursor: 'pointer', fontSize: '1.5rem' }}
          onClick={() => setRating(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Update Product Review</h1>
        <div className="mb-3">
          <h3>{product.name}</h3>
          <img src={product.imgSrc} alt={product.name} className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating:
            </label>
            <div style={{ marginBottom: '1rem' }}>{renderStarIcons()}</div>
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
          <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Update Review'}
          </button>
        </form>
      </div>
      <Footer />
      <FAQButton />
    </>
  );
};

export default UpdateReviews;
