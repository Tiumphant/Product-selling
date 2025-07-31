import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserDashboard from "./UserDashboard";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [viewProduct, setViewProduct] = useState(null);
  const navigate = useNavigate();

  const API = "http://localhost:8000/api/product";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
    <UserDashboard/>
    <div className="container mt-4">

      <h2 className="text-center mb-4">Product List</h2>

      <div className="mb-3 text-end">
        <input
          type="text"
          className="form-control w-25 d-inline"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                <Link to={`/productcard/${product._id}`}>
               <button className="btn btn-sm btn-info">View</button>
         </Link>
                </td>
                {/* <td>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete 
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    Edit
                  </button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Products Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}
