import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Products.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const imageInputRef = useRef(null);

  
  const handleAddProduct = () => {
    // Gửi yêu cầu POST để tạo sản phẩm mới
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('image', newProduct.image);

      axios.post('http://localhost:9999/products', formData
      )
      .then((response) => {
        // Sau khi tạo thành công, thêm sản phẩm mới vào mảng products
        setProducts([...products, response.data]);
        // Đặt lại giá trị của newProduct để chuẩn bị cho sản phẩm tiếp theo
        setNewProduct({
          name: '',
          price: 0,
          category: '',
          image: '',
        });
        // Đóng modal
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  const fetchCategories = () => {
    axios
      .get('http://localhost:9999/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  useEffect(() => {
    // Gửi yêu cầu GET đến URL của backend để lấy dữ liệu sản phẩm
    axios.get('http://localhost:9999/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    fetchCategories(); // Lấy danh sách danh mục
  }, []);

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Product
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} className=' modal'>
        <Modal.Header >
          <h2>
             Add Product</h2>
        </Modal.Header>
        <Modal.Body>
          <Form className='form'>
            <div className="form-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="productPrice">Price</label>
              <input
                type="number"
                id="productPrice"
                placeholder="Enter product price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="productCategory">Category</label>
              <select
                id="productCategory"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="productImage">Image</label>
              <input
                type="file"
                id="productImage"
                ref={imageInputRef}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
  <tr key={product?._id}>
    <td>{index + 1}</td>
    <td>{product?.name}</td>
    <td>{product?.price}</td>
    <td>{product?.category?.name}</td> 
    {/* Fix Cannot reading name */}
    <td></td>
    <td>
        <img
          src={product?.images[0]?.url}
          // fix hien thi anh
          alt={product?.name}
          style={{ width: '100px', height: '100px' }}
        />
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
