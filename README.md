# 📦 Inventory Management System

A modern, full-stack inventory management application built with **Spring Boot** (backend) and **React** (frontend).

---

## 🏗️ Project Structure

```
pops/
├── quotedesk-backend/          # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/quotedesk/
│   │       │   ├── controller/     # REST Controllers
│   │       │   ├── model/          # Entity Models
│   │       │   ├── repository/     # JPA Repositories
│   │       │   └── service/        # Business Logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── quotedesk-frontend/         # React Application
    ├── src/
    │   ├── App.jsx             # Main App Component
    │   ├── index.css           # Global Styles
    │   └── main.jsx            # Entry Point
    └── package.json
```

---

## 🎯 Features

### Backend Features
- ✅ RESTful API with Spring Boot
- ✅ PostgreSQL database integration
- ✅ JPA/Hibernate ORM
- ✅ CORS enabled for frontend integration
- ✅ Full CRUD operations
- ✅ Automatic timestamp tracking

### Frontend Features
- ✅ Modern React UI with beautiful design
- ✅ Real-time statistics dashboard
- ✅ Create, Read, Update, Delete operations
- ✅ Responsive design
- ✅ Modal-based forms
- ✅ Automatic total price calculation
- ✅ Loading states and empty states
- ✅ Smooth animations and transitions

---

## 📊 Product Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | Long | Auto-generated primary key |
| `description` | String | Product description |
| `quantity` | Integer | Number of units |
| `quotedUnitPrice` | BigDecimal | Price per unit |
| `totalPrice` | BigDecimal | Calculated (quantity × unit price) |
| `createdAt` | LocalDateTime | Creation timestamp |
| `updatedAt` | LocalDateTime | Last update timestamp |

*Note: The backend model includes many additional fields (make, model, country, gas, scope, exWorkCost, etc.) for more complex use cases.*

---

## 🚀 Getting Started

### Prerequisites

1. **Java Development Kit (JDK) 19+**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   
2. **PostgreSQL Database**
   - Download from: https://www.postgresql.org/download/
   
3. **Node.js 18+**
   - Download from: https://nodejs.org/

---

## 📝 Setup Instructions

### Step 1: Database Setup

1. **Install PostgreSQL** if not already installed

2. **Create the database:**
   ```sql
   CREATE DATABASE inventory_db;
   ```

3. **Update credentials** (if different from defaults):
   - Edit: `quotedesk-backend/src/main/resources/application.properties`
   - Default credentials:
     ```properties
     spring.datasource.username=postgres
     spring.datasource.password=toor
     ```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd c:\path\to\directory\quotedesk-backend
   ```

2. **Run the Spring Boot application:**
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
   
   Or on macOS/Linux:
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Verify the backend is running:**
   - Backend should be accessible at: `http://localhost:8080`
   - API endpoint: `http://localhost:8080/api/products`

### Step 3: Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd c:\path\to\directory\quotedesk-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   - The frontend will typically run on: `http://localhost:5173`
   - Open this URL in your browser

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/{id}` | Update a product |
| `DELETE` | `/api/products/{id}` | Delete a product |

### Example API Requests

**Create a Product:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Premium Widget",
    "quantity": 100,
    "quotedUnitPrice": 25.50,
    "totalPrice": 2550.00
  }'
```

**Get All Products:**
```bash
curl http://localhost:8080/api/products
```

---

## 🎨 Frontend Features in Detail

### Statistics Dashboard
- **Total Products**: Count of all products in inventory
- **Total Units**: Sum of all product quantities
- **Total Value**: Sum of all product total prices

### Product Table
- View all products in a clean, organized table
- Hover effects for better UX
- Color-coded headers with gradient design

### Create/Edit Modal
- Beautiful modal dialog for adding/editing products
- Real-time total price calculation
- Form validation
- Smooth animations

### Actions
- **Edit**: Click the edit (✏️) icon to modify a product
- **Delete**: Click the delete (🗑️) icon with confirmation dialog

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 4.0.0
- **Language**: Java 19
- **Database**: PostgreSQL
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Design System)
- **Font**: Google Fonts - Inter

---

## 🎨 Design System

The frontend uses a comprehensive design system with:
- **Color Palette**: HSL-based with primary, accent, success, danger, and neutral colors
- **Typography**: Inter font family with multiple weights
- **Gradients**: Smooth gradient backgrounds and buttons
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first responsive design

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- ✅ Check if PostgreSQL is running
- ✅ Verify database `inventory_db` exists
- ✅ Check credentials in `application.properties`
- ✅ Ensure port 8080 is not in use

**Problem**: Database connection error
- ✅ Verify PostgreSQL is running on port 5432
- ✅ Check username and password
- ✅ Ensure database exists

### Frontend Issues

**Problem**: Cannot connect to backend
- ✅ Ensure backend is running on `http://localhost:8080`
- ✅ Check for CORS errors in browser console
- ✅ Verify API_BASE_URL in `App.jsx`

**Problem**: Blank page
- ✅ Check browser console for errors
- ✅ Ensure all dependencies are installed (`npm install`)
- ✅ Try clearing browser cache

---

## 📚 Next Steps

### Suggested Enhancements

1. **Authentication & Authorization**
   - Add user login/registration
   - Implement JWT tokens
   - Role-based access control

2. **Additional Features**
   - Search and filter products
   - Pagination for large datasets
   - Export to CSV/Excel
   - Product categories
   - Image upload for products
   - Barcode generation/scanning

3. **Backend Improvements**
   - Add validation
   - Implement proper error handling
   - Add unit tests
   - Create service layer (currently controller talks directly to repository)

4. **Frontend Improvements**
   - Add error boundaries
   - Implement React Query for better data fetching
   - Add toast notifications
   - Dark mode toggle
   - Advanced filtering and sorting

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the API endpoints
3. Verify both backend and frontend are running
4. Check browser console for frontend errors
5. Check terminal logs for backend errors

---

**Happy Coding! 🚀**
