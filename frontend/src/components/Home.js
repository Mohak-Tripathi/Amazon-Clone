import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layouts/MetaData";

import { useSelector, useDispatch } from "react-redux";
import { getProducts, clearErrors } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (pageNumber) => {   //automatically, it is coming from react pagination package. Just provide onChange there
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

const {keyword} = useParams();

console.log(keyword, "KLKL");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    } else {
      dispatch(getProducts(keyword, currentPage));
    }
  }, [dispatch, error, alert, currentPage, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products-FakeAmazon"} />
          <h1 id='products_heading'>Latest Products</h1>

          <section id='products' className='container mt-5'>
            <div className='row'>
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>

          {resPerPage <= productsCount && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass='page-item' // bootstrap Class
                linkClass='page-link' // bootstrap Class
              />
            </div>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Home;
