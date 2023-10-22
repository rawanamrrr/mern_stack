import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import {useSelector} from "react-redux";

const ProductDetails = (history,match) => {
  const[size,setSize]=useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const[cart,setCart]=useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="500"
            width={"350px"}
          />
        </div>
        
        

        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              
            })}
            
          </h6>
          <div className="size">
            <div className="d-flex ms-3">
              <div className="form-check" >
                <input type="radio" name="S"  value={"S"} onChange={(e)=>setSize(e.target.value)} className="form-check-input"onSelect={product.size="S"} />
                <label htmlFor="S" className="form-check-label">S</label>

              </div>

            </div>
          </div>
          <div className="size">
            <div className="d-flex ms-3">
              <div className="form-check">
                <input type="radio" name="S"  value={"M"} onChange={(e)=>setSize(e.target.value)} className="form-check-input" onSelect={product.size="M"} />
                <label htmlFor="M" className="form-check-label">M</label>

              </div>

            </div>
          </div> <div className="size">
            <div className="d-flex ms-3">
              <div className="form-check">
                <input type="radio" name="S"  value={"L"} onChange={(e)=>setSize(e.target.value)} className="form-check-input" onSelect={product.size="L"} />
                <label htmlFor="L" className="form-check-label">L</label>

              </div>

            </div>
          </div> 
          
          <h6>Category : {product?.category?.name}</h6>
         
          <button className="btn btn-secondary ms-1" onClick={() =>{
  try {
    if(!size){
      return alert("please select size");

    }
  } catch (error) {
    console.log(error);
    
  }setCart([...cart,product]);localStorage.setItem('cart',JSON.stringify([...cart,product])); toast.success('Item Added To Cart')}}>ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>You may also like ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap ">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id} onClick={() =>navigate(`/product/${p.slug}`)}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">LE {p.price.toLocaleString("en-US", {
                      
                    })}
                  </h5>
                </div>
                
                <div className="card-name-price">
                  
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;