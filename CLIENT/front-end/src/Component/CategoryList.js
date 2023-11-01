import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CategoryList.css"; // Nhập tệp CSS
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleAddCategory = () => {
    // Gửi yêu cầu POST để tạo danh mục mới
    axios
      .post("http://localhost:9999/categories", newCategory)
      .then((response) => {
        // Sau khi tạo thành công, thêm danh mục mới vào mảng categories
        setCategories([...categories, response.data]);
        // Đặt lại giá trị của newCategory để chuẩn bị cho danh mục tiếp theo
        setNewCategory({
          name: "",
          description: "",
        });
        // Đóng modal
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  useEffect(() => {
    // Gửi yêu cầu GET đến URL của backend để lấy dữ liệu danh mục
    axios
      .get("http://localhost:9999/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="category-list">
      <h1>Category List</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Category
      </Button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className=" modal"
      >
        <Modal.Header>
          <h2>Add Category</h2>
        </Modal.Header>
        <Modal.Body>
          <Form className="form">
            <div className="form-group">
              <label htmlFor="categoryName">Name</label>
              <input
                type="text"
                id="categoryName"
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryDescription">Description</label>
              <input
                type="text"
                id="categoryDescription"
                placeholder="Enter category description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={categories?._id && category?._id}>
              <td>{index + 1}</td>
              <td>{category?.name}</td>
              <td>{category?.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
