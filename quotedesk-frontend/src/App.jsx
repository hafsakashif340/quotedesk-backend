import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8080/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    description: '',
    quantity: 0,
    quotedUnitPrice: 0,
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products. Make sure the backend is running on http://localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate total price
  const calculateTotal = (quantity, unitPrice) => {
    return (quantity * unitPrice).toFixed(2);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'make' || name === 'model' || name === 'description') ? value : parseFloat(value) || 0
    }));
  };

  // Open modal for creating new product
  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      make: '',
      model: '',
      description: '',
      quantity: 0,
      quotedUnitPrice: 0,
    });
    setShowModal(true);
  };

  // Open modal for editing existing product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      make: product.make || '',
      model: product.model || '',
      description: product.description || '',
      quantity: product.quantity || 0,
      quotedUnitPrice: product.quotedUnitPrice || 0,
    });
    setShowModal(true);
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      totalPrice: calculateTotal(formData.quantity, formData.quotedUnitPrice)
    };

    try {
      if (editingProduct) {
        // Update existing product
        await fetch(`${API_BASE_URL}/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...editingProduct, ...productData }),
        });
      } else {
        // Create new product
        await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  // Calculate statistics
  const stats = {
    totalProducts: products.length,
    totalQuantity: products.reduce((sum, p) => sum + (p.quantity || 0), 0),
    totalValue: products.reduce((sum, p) => sum + (parseFloat(p.totalPrice) || 0), 0).toFixed(2),
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>📦 Inventory Management System</h1>
          <p>Manage your products efficiently with real-time updates</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{stats.totalProducts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Units</div>
            <div className="stat-value">{stats.totalQuantity}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Value</div>
            <div className="stat-value">OMR {stats.totalValue}</div>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Product Inventory</h2>
            <button className="btn btn-primary" onClick={handleCreate}>
              ➕ Add Product
            </button>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <div className="empty-state-text">No products found</div>
              <button className="btn btn-primary" onClick={handleCreate}>
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>{product.make || 'N/A'}</td>
                      <td>{product.model || 'N/A'}</td>
                      <td>{product.description || 'N/A'}</td>
                      <td>{product.quantity || 0}</td>
                      <td>OMR {parseFloat(product.quotedUnitPrice || 0).toFixed(2)}</td>
                      <td>
                        <strong>
                          OMR {parseFloat(product.totalPrice || 0).toFixed(2)}
                        </strong>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-icon btn-secondary"
                            onClick={() => handleEdit(product)}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-icon btn-danger"
                            onClick={() => handleDelete(product.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="make">
                    Make / Brand
                  </label>
                  <input
                    type="text"
                    id="make"
                    name="make"
                    className="form-input"
                    value={formData.make}
                    onChange={handleInputChange}
                    placeholder="e.g., Samsung, Apple, Dell"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="model">
                    Model / Product Name
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    className="form-input"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="e.g., Galaxy S24, iPhone 15"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-input"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Additional details about the product"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-input"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="quotedUnitPrice">
                    Unit Price (OMR)
                  </label>
                  <input
                    type="number"
                    id="quotedUnitPrice"
                    name="quotedUnitPrice"
                    className="form-input"
                    value={formData.quotedUnitPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Total Price</label>
                <div className="stat-value" style={{ color: 'var(--primary-600)' }}>
                  OMR {calculateTotal(formData.quantity, formData.quotedUnitPrice)}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
