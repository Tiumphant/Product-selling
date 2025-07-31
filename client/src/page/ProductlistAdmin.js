import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dashbord from "./Dashbord";
export default function ProductlistAdmin() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product");
      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data)
      } else {
        setProducts([]);
        console.warn("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError("Error deleting product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Dashbord />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Product List</h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3 text-end">
          <input
            type="text"
            className="form-control w-25 d-inline"
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>View</th>
                <th>Actions</th>
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
                      <Link to={`/productcardadmin/${product._id}`}>
                        <button className="btn btn-sm btn-info">View</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/productEditlist/${product._id}`}>
                        <button className="btn btn-sm btn-primary">Edit</button>
                      </Link>
                    </td> 2
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Products Found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
