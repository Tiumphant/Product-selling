import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "./Dashbord";

export default function Productadmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const api = "http://localhost:8000/api/product";

  useEffect(() => {
    if (id) {
      axios.get(`${api}/${id}`)
        .then((res) => {
          const p = res.data;
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price);
          setPreviewImage(`http://localhost:8000/uploads/${p.image}`);
        })
        .catch(err => console.error("Error loading product", err));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      if (id) {
        await axios.put(`${api}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/productlistadmin");
    } catch (err) {
      console.error("Error submitting product", err);
    }
  };

  return (
    <>
      <Dashboard />
      <div className="container mt-4">
        <h2 className="text-center">{id ? "Edit Product" : "Add Product"}</h2>
        <form className="form p-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Product Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                } else {
                  setImage(null);
                  setPreviewImage(null);
                }
              }}
            />
          </div>

          {previewImage && (
            <div className="mb-3 text-center">
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}

          <button type="submit" className="btn btn-success w-100">
            {id ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
}
