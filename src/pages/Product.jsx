import React, { useEffect, useState, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Toaster from "../components/Toaster";
import '../css/products.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext';   
import { Footer, Navbar, LaptopSpecs, SmartphoneSpecs, TabletSpecs,FAQButton } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate()
  const [loading2, setLoading2] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const dispatch = useDispatch();

  const addProduct = (product) => {
    if(isAuthenticated){
      setToasterMessage(`${product.name} added to cart`);
      setShowToaster(true);
      dispatch(addCart(product));
      return;
    }
    navigate('/login')
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);

      try {
        const productResponse = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(productResponse.data);
        setLoading(false);

        const reviews = productResponse.data.reviews;
        setReviews(reviews);
        setLoadingReviews(false);

        const allProductsResponse = await axios.get(`http://localhost:3000/products`);
        const filteredProducts = allProductsResponse.data.filter(
          (item) => item.category === productResponse.data.category && item.id !== id
        );
        setSimilarProducts(filteredProducts);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
        setLoading2(false);
        setLoadingReviews(false);
      }
    };

    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    const calculateAverageRating = () => {
      if (product.reviews && product.reviews.length > 0) {
        const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / product.reviews.length).toFixed(1);
      }
      return "No reviews yet";
    };

    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.imgSrc}
              alt={product.name}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.name}</h1>
            <p className="lead">
              Average Rating: {calculateAverageRating()}{" "}
              {calculateAverageRating() !== "No reviews yet" && <i className="fa fa-star"></i>}
            </p>
            <h3 className="display-6 my-4">Rp. {product.price && product.price.toLocaleString('id-ID')}</h3>
            <p className="lead">{product.description}</p>
            {product.color && product.color.length > 0 && (
              <div className="my-3">
                <strong>Colors Available:</strong>{" "}
                {product.color.map((color, index) => (
                  <span key={index} className="badge bg-dark mx-1">
                    {color}
                  </span>
                ))}
              </div>
            )}
             <button className="btn btn-outline-dark mb-3" onClick={() => addProduct(product)}>
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3 mb-3">
              Go to Cart
            </Link>
            {product.category === 'laptop' && <LaptopSpecs specs={product.laptopSpecs} />}
            {product.category === 'smartphone' && <SmartphoneSpecs specs={product.smartphoneSpecs} />}
            {product.category === 'tablet' && <TabletSpecs specs={product.tabletSpecs} />}
          </div>
        </div>
      </div>
    );
  };

  const ShowReviews = () => {

    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= rating; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>);
      }
      return stars;
    };

    return (
      <section className="home-testimonial">
        <div className="container-fluid">
          <section className="home-testimonial-bottom">
            <div className="container testimonial-inner">
              {loadingReviews ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12">
                    <h2>Product Haven't Got Reviews Yet! Be the First!</h2>
                  </div>
                </div>
              ) : (
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12 pt-4">
                    <h3 className="text-center">Product Reviews</h3>
                    <h2 className="text-center">Explore Customer Experiences</h2>
                  </div>
                  {reviews.map((review) => (
                    <div key={review.id} className="col-md-4 style-3 mb-4">
                      <div className="tour-item">
                        <div className="tour-desc bg-white">
                          <div className="tour-text color-grey-3 text-center">
                            &ldquo;{review.comment}&rdquo;
                          </div>
                          <div className="d-flex justify-content-center pt-2 pb-2">
                            <img
                              className="tm-people"
                              src="/img/placeholder.png"
                              alt=""
                            />
                          </div>
                          <div className="link-name d-flex justify-content-center">
                            {review.userName || "Anonymous"}
                          </div>
                          <div className="link-position d-flex justify-content-center">
                            Rating: {review.rating} {" "}
                          </div>
                          <div className="link-position d-flex justify-content-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    );
  };

  const Loading2 = () => {
    return (
      <div className="my-4 py-4">
        <div className="d-flex">
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => (
            <div key={item.id} className="card mx-4 text-center">
              <img
                className="card-img-top p-3 hover-zoom"
                src={item.imgSrc}
                alt={item.name}
                height={300}
                width={300}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
              </div>
              <div className="card-body">
                <Link to={"/product/" + item.id} className="btn btn-dark m-1">
                  Details
                </Link>
                <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Toaster
        message={toasterMessage}
        show={showToaster}
        onClose={() => setShowToaster(false)}
        color="primary"
      />
      <ShowReviews />
      <Footer />
      <FAQButton />
    </>
  );
};

export default Product;