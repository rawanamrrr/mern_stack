import React, {useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
import "../styles/Homepage.css";


const HomePage = () => {
  const navigate= useNavigate();
  const [cart,setCart] = useCart();
  const[auth,setAuth] =useAuth();
  const [products,setProucts] =useState([]);
  const [categories,setCategories] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading , setLoading] =useState(1);
  const[size,setSize]=useState("");
  const [product, setProduct] = useState({});

  
  const getAllProducts = async () =>{
    try {
      setLoading(true);
      const{data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProucts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  };


 const getTotal = async () => {
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/product/product-count');
    setTotal(data?.total);
  } catch (error) {
    console.log(error);
  }

};
useEffect(() => {
  getAllProducts();
  getTotal();
 },[] );
useEffect(() => {
  if(page === 1) return; loadMore();
},[page]);
 const loadMore =async () => {
  try {
    setLoading(true);
    const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
    setLoading(false);

    setProucts([...products ,...data?.products])
    
  } catch (error) {
    console.log(error);
    setLoading(false);

  }
 };

  return (
    
    
    <Layout title={'Products'}>
      <div className=" cart-page2">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center  p-2 mb-1"> <img
            src="images\male-black-oversize-butterfly-front-&-back-graphic-t-shirt.png"
            
            style={{ width: "100%" }}
          />Buy 3 for only 900</h4>
        
            </div>
            </div>
            </div>
        <div className='row mt-3'>
        <div className='col-md-3'>
         
        </div>
        

          <div className='col-md-6'>
            <h1 className='text-center'>Products</h1>
            <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              
                <div className="card m-2" style={{ width: "18rem" }} >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top  " onClick={() =>navigate(`/product/${p.slug}`)}
                    alt={p.name}
                  />
                  <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">LE {p.price.toLocaleString("en-US", {
                      
                    })}
                  </h5>
                </div>
                <div className="size">
            <div className="d-flex ms-3">
              <div className="form-check" >
                <input type="radio" name="S"  value={"S"} onChange={(e)=>setSize(e.target.value)} className="form-check-input" />
                <label htmlFor="S" className="form-check-label">S</label>

             

              </div>
              <div className="form-check">
                <input type="radio" name="S"  value={"M"} onChange={(e)=>setSize(e.target.value)} className="form-check-input" onSelect={p.size="M"} />
                <label htmlFor="M" className="form-check-label">M</label>

              </div><div className="form-check">
                <input type="radio" name="S"  value={"L"} onChange={(e)=>setSize(e.target.value)} className="form-check-input" onSelect={p.size="L"} />
                <label htmlFor="L" className="form-check-label">L</label>

              </div>

            </div>
          </div> 
                
             
                   
                    
                    <button className="btn btn-secondary ms-1" onClick={() =>{setCart([...cart,p]);localStorage.setItem('cart',JSON.stringify([...cart,p])); toast.success('Item Added To Cart')}}>ADD TO CART</button>

                  </div>
                </div>

            ))}
            </div>
            <div className='m-2 p-3'>
              {products && products.length<total && (
                <button className='btn btn-warning' onClick={(e) =>{
                  e.preventDefault();
                  setPage(page + 1);

                }}>{loading ? "Loading ..." : "Loadmore"}</button>
              )}
            </div>

          </div>

        </div>
    </Layout>
  );
};

export default HomePage;