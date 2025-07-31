import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductCard.css';
import Dashbord from './Dashbord';
export default function Productcardadmin() {
  const { id } = useParams();
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/product/${id}`);
        const data = res.data.data;

        setViewProduct({
          image: `http://localhost:8000/uploads/${data.image}`,
          name: data.name,
          description: data.description,
          price: data.price,
        });
      } catch (err) {
        console.error("Error fetching product data", err);
      }
    };

    if (id) {
      fetchSingleProduct();
    }
  }, [id]);
if(!viewProduct){
  return <div>Loading...</div>;
}

  return (
    <>
    <Dashbord />
<div className="cover bg-gradient">
  <div className="card product-card mx-auto shadow-lg rounded-4">
    <div className="d-flex h-100 flex-row">
      <div className="image-container">
        <img
          src={viewProduct.image}
          alt={viewProduct.name}
          className="rounded-start"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title fw-bold text-primary">{viewProduct.name}</h5>
        <p className="card-text text-primary">{viewProduct.description}</p>
        <p className="card-text text-primary">
          <strong>Price:</strong> ₹{viewProduct.price}
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
