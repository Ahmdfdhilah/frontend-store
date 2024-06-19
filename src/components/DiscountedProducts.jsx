import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import Toaster from "./Toaster";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import '../css/products.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext';

const DiscountedProducts = () => {
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const { isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const addProduct = (product) => {
        if(isAuthenticated){
          dispatch(addCart(product));
          setToasterMessage(`${product.name} added to cart`);
          setShowToaster(true);
          return
        }
        navigate('/login')
      };

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://trust-d4cbc4aea2b1.herokuapp.com/products");
                const products = await response.json();
                const discountedProducts = products.filter(product => product.discounts && product.discounts.discount > 0);
                setFilter(discountedProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-12 py-5 text-center">
                    <Skeleton height={40} width={560} />
                </div>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                        <Skeleton height={592} />
                    </div>
                ))}
            </>
        );
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);

    const ShowProducts = () => {
        return (
            <>
                {currentProducts.map((product) => {
                    const discountedPrice = product.price - (product.price * (product.discounts.discount / 100));
                    return (
                        <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                            <div className="card text-center h-100 position-relative">
                                <div className="discount-overlay">
                                    {product.discounts && (
                                        <>
                                            <span className="discount-label">{product.discounts.discount}% OFF</span> <br />
                                            <span className="expires-at">Expires at: {new Date(product.discounts.expires_at).toISOString().split('T')[0]}</span>
                                        </>
                                    )}
                                </div>

                                <img className="card-img-top p-3 hover-zoom" src={product.imgSrc} alt="Product" height={300} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                </div>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item lead">Stock: {product.inventory}</li>
                                    <li className="list-group-item">
                                        <span className="original-price">Rp. {product.price.toLocaleString('id-ID')}</span> 
                                        <span className="discounted-price"> Rp. {discountedPrice.toLocaleString('id-ID')}</span>
                                    </li>
                                    <li className="list-group-item">Colors: {product.color.join(', ')}</li>
                                </ul>

                                <div className="card-body">
                                    <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                                        Details
                                    </Link>
                                    <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <a href="#" onClick={() => paginate(number)} className="page-link custom-page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    return (
        <>
            <div className="container my-3 py-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="display-5 text-center pt-2">SALE PROMO!</h2>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
                {!loading && (
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={filter.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                )}
            </div>
            <Toaster message={toasterMessage} show={showToaster} onClose={() => setShowToaster(false)} color="primary" />
        </>
    );
};

export default DiscountedProducts;
