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

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate()
  const [itemsPerPage] = useState(6);
  const [search, setSearch] = useState("");

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
        setData(products);
        setFilter(products);
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

  const filterProduct = (category) => {
    const updatedList = category === "All" ? data : data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    setFilter(updatedList);
    setCurrentPage(1);
    setSelectedCategory(category);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setFilter(data);
    } else {
      const searchResults = data.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilter(searchResults);
    }
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className={`btn btn-outline-dark btn-sm m-2 ${selectedCategory === "All" ? "active-category" : ""}`}
            onClick={() => filterProduct("All")}
          >
            All
          </button>
          <button
            className={`btn btn-outline-dark btn-sm m-2 ${selectedCategory === "laptop" ? "active-category" : ""}`}
            onClick={() => filterProduct("laptop")}
          >
            Laptops
          </button>
          <button
            className={`btn btn-outline-dark btn-sm m-2 ${selectedCategory === "smartphone" ? "active-category" : ""}`}
            onClick={() => filterProduct("smartphone")}
          >
            Smartphones
          </button>
          <button
            className={`btn btn-outline-dark btn-sm m-2 ${selectedCategory === "tablet" ? "active-category" : ""}`}
            onClick={() => filterProduct("tablet")}
          >
            Tablets
          </button>
        </div>

        {currentProducts.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <div className="card text-center h-100">
              <img className="card-img-top p-3 hover-zoom" src={product.imgSrc} alt="Product" height={300} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item lead">Stock {product.inventory}</li><br />
                <li className="list-group-item">Rp. {product.price.toLocaleString('id-ID')}</li>
                <li className="list-group-item">Colors:  {product.color.map((color) => { return color + ', ' })}</li>
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
        ))}
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
              <button onClick={() => paginate(number)} className="page-link custom-page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <>
      <div className="container my-3 py-4">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
              value={search}
              onChange={handleSearch}
            />
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

export default Products;