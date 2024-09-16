# 3legant eCommerce Project

Welcome to the 3legant eCommerce Project! This is a full-stack application designed for managing an online store. It includes features for user management, cart management, product management, and an admin panel. This README provides information on how to set up and run the project.

## Table of Contents

- [3legant eCommerce Project](#3legant-ecommerce-project)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Installation](#installation)
- [NOTE](#note)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [NOTE - Functionality Remaining](#note---functionality-remaining)

## Project Overview

The 3legant eCommerce Project is a web application that allows users to browse products, add them to their cart, and manage their orders. It includes:

- **User Management**: User registration, login, and profile management.
- **Product Management**: Product listing, details, and cart management.
- **Admin Panel**: Admin dashboard for managing users and products.
- **Shipping & Coupons**: Options for shipping and applying coupon codes.

## Installation

# NOTE 
Default Admin User : 
- email : admin@elegant.com
- password : admin123

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/3legant-ecommerce.git
   cd 3legant-ecommerce
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

3. **Install Dependencies**

   Ensure you have Node.js and npm installed. Run:

   ```bash
   npm install
   ```

4. **Configure Environment Variables**
    
   `NOTE` : `.env` file already exist if you want to change variables, change them accordingly <br/> <br/> 
    `.env` file in the `backend` directory with the following content:

   ```env
   PORT=9000
   MONGO_URI=mongodb://localhost:27017/3legant
   JWT_SECRET=your_jwt_secret
   ```

   - `PORT`: Port for the backend server.
   - `MONGO_URI`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT authentication.


5. **Start the Backend Server**

   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Run:

   ```bash
   npm install
   ```


3. **Start the Frontend Development Server**

   ```bash
   npm run dev
   ```

   This will start the frontend development server on `http://localhost:5173`.

## Usage

- **Backend**: The backend server will be running on `http://localhost:9000`.
- **Frontend**: The frontend application will be available at `http://localhost:5173`.
  
You can interact with the application through the web interface or directly through the API endpoints.

## API Endpoints

Here are some key API endpoints for the project:

- **User Routes**
  - `POST /api/users/register`: Register a new user
  - `POST /api/users/login`: Log in a user
  - `GET /api/users/profile`: Get user profile

- **Cart Routes**
  - `GET /api/cart`: Get the current user's cart
  - `POST /api/cart`: Add an item to the cart
  - `PUT /api/cart/:id`: Update item quantity in the cart
  - `DELETE /api/cart/:id`: Remove an item from the cart

- **Product Routes**
  - `GET /api/products`: Get a list of products
  - `GET /api/products/:id`: Get product details
  - `POST /api/products`: Add a new product (Admin only)
  - `PUT /api/products/:id`: Update a product (Admin only)
  - `DELETE /api/products/:id`: Delete a product (Admin only)

- **Admin Routes**
  - `GET /api/admin/dashboard`: Get admin dashboard data
  - `GET /api/admin/users`: List all users (Admin only)
  - `GET /api/admin/products`: List all products (Admin only)

# NOTE - Functionality Remaining
Image upload functionality still remaining