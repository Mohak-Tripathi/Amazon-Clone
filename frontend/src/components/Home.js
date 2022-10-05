import React, { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";

import { useSelector, useDispatch } from "react-redux";
import { getProducts, clearErrors} from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    else{
      dispatch(getProducts());
    }

  
  }, [dispatch, error, alert]);

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
        </Fragment>
      )}
    </>
  );
};

export default Home;
