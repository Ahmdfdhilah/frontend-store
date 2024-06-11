import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/products");
        if (componentMounted) {
          const products = await response.json();
          setData(products);
          setFilter(products); 
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
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
    const updatedList = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>
            All
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("laptop")}>
            Laptops
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("smartphone")}>
            Smartphones
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("tablet")}>
            Tablets
          </button>
        </div>

        {filter.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <div className="card text-center h-100">
              <img className="card-img-top p-3" src="/img/products/tecno-spark-20-pro-plus-1.jpg" alt="Product" height={300} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">...</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item lead">Rp. {product.price}</li>
              </ul>
              <div className="card-body">
                <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                  Buy Now
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

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
