import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./ProductCard.css"
import { useParams } from 'react-router-dom';
import Dashbord from './Dashbord';
export default function ProductCard() {
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
    <Dashbord/>
    <div className="cover">
      <div className="card mx-auto mt-4" style={{ width: "30rem", height: "12rem" }}>
        <div className="d-flex h-100">
          
          <div style={{ width: "40%", height: "100%" }}>
            <img
              src={viewProduct.image}
              alt={viewProduct.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="rounded-start"
            />
          </div>
          <div className="card-body" style={{ width: "60%", overflow: "hidden" }}>
            <h5 className="card-title">{viewProduct.name}</h5>
            <p className="card-text text-truncate">{viewProduct.description}</p>
            <p className="card-text">
              <strong>Price:</strong> {viewProduct.price}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
