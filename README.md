# Library Management System 

## Overview

The Library Management System (LMS) is a web application designed to help libraries manage books, users efficiently. This application allows users to track book availability, and manage their accounts. 

## Features

### Book functionalities
- Add, update and delete a book
- View all the books present in the database
- Search book in the given database

### User functionalities
- Login, Register, Update and delete a user
- View all the user present in the database

## Requirements

- **Node.js** (v14 or higher)
- **MongoDB** (or a MongoDB URI for remote databases like MongoDB Atlas)

## Setup Instructions

Follow these steps to get the application up and running locally:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Aditya-Krishnan-C/Library-Management-System.git
cd Library-Management-System
```

### 2. Install Dependencies
Next, install the required dependencies using npm:

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root directory and set the following environment variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/library  # Or your MongoDB Atlas URI
JWT_SECRET=your_jwt_secret_key
```

PORT: Port on which the server will run.  
MONGO_URI: The URI to connect to your MongoDB database.  
If you're using MongoDB locally, 
```bash
mongodb://localhost:27017/library 
```
will work.  

For cloud databases like MongoDB Atlas, you can find the connection URI in your Atlas dashboard.  

JWT_SECRET: A secret key used for JSON Web Token (JWT) authentication.

### 4. Start the Application
Run the following command to start the application:

```bash
npm start
```
The server will be running on http://localhost:3000 by default. 

## API Endpoints

### Book API

The **Book API** allows you to manage books in the system. All requests require authentication using JWT (JSON Web Token). Below are the available endpoints:

#### 1. **Get All Books**  
- ![GET](https://img.shields.io/badge/GET-green)  
- **API**: `/api/books`  
- **Description**: Retrieves all books in the library.  
- **Authentication**: Required (JWT)  


#### 2. **Add a New Book**  
- ![POST](https://img.shields.io/badge/POST-blue)  
- **API**: `/api/books`  
- **Description**: Adds a new book to the library database.  
- **Authentication**: Required (JWT)  
- **Access**: Admin

#### 3. **Get Book by ID**  
- ![GET](https://img.shields.io/badge/GET-green)  
- **API**: `/api/books/:id`  
- **Description**: Retrieves a single book's details by its ID.  
- **Authentication**: Required (JWT)  
- **Access**: Admin, User

#### 4. **Update Book Information**  
- ![PUT](https://img.shields.io/badge/PUT-orange)  
- **API**: `/api/books/:id`  
- **Description**: Updates an existing book's information by its ID.  
- **Authentication**: Required (JWT)  
- **Access**: Admin

#### 5. **Delete a Book**  
- ![DELETE](https://img.shields.io/badge/DELETE-red)  
- **API**: `/api/books/:id`  
- **Description**: Deletes a book by its ID from the system.  
- **Authentication**: Required (JWT)  
- **Access**: Admin

### User API

The **User API** allows you to manage user accounts. Authentication is required for most actions. Public access is available for login and registration routes. Below are the available endpoints:


#### 1. **Registration Form**  
- ![GET](https://img.shields.io/badge/GET-green)  
- **API**: `/api/auth/register`  
- **Description**: Retrieves the registration form for new users.  
- **Authentication**: None  
- **Access**: Public

#### Response :
Displays a register form.

#### 2. **Login Form**  
- ![GET](https://img.shields.io/badge/GET-green)  
- **API**: `/api/auth/login`  
- **Description**: Retrieves the login form for users to sign in.  
- **Authentication**: None  
- **Access**: Public

#### Response :
Displays a login form with email and password form.


#### 3. **View All Users**  
- ![GET](https://img.shields.io/badge/GET-green)  
- **API**: `/api/auth/viewAllUsers`  
- **Description**: Retrieves a list of all users in the system.  
- **Authentication**: Required (JWT)  
- **Access**: Admin

#### Response :
```
{
        "_id": "675736c89e8e089a780033e8",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "$2a$10$WZp0otMUgGWA/eVguAi0nOGI1gzwG0bj935Jj044OD45d90ZiRZ86",
        "membership_type": "Premium",
        "registered_date": "2024-12-09T18:28:24.137Z",
        "__v": 0
    },
    {
        "_id": "675736e39e8e089a780033eb",
        "name": "Joy K",
        "email": "joyk@example.com",
        "password": "$2a$10$LrKr7BDQcza/BTDxe9Sea.bv/2hGLQL9LCc./yfHO437JIg630x4O",
        "membership_type": "Regular",
        "registered_date": "2024-12-09T18:28:51.494Z",
        "__v": 0
    }
```


#### 4. **User Login**  
- ![POST](https://img.shields.io/badge/POST-blue)  
- **API**: `/api/auth/login`  
- **Description**: User login with username and password. Returns a JWT upon successful login.  
- **Authentication**: None  
- **Access**: Public

### Body :
```
{
  "name": "Joy K",
  "email": "joyk@example.com",
  "password": "123",
  "membership_type": "Regular"
}
```
### Response :
```
{
    "name": "Joy K",
    "email": "joyk@example.com",
    "membership_type": "Regular",
    "password": "$2a$10$LrKr7BDQcza/BTDxe9Sea.bv/2hGLQL9LCc./yfHO437JIg630x4O",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.             eyJ1c2VySWQiOiI2NzU3MzZlMzllOGUwODlhNzgwMDMzZWIiLCJpYXQiOjE3MzM3NjkwMjYsImV4cCI6MTczMzc3MjYyNn0.FX_f4umf6TeU2KrRMo6XDcQufM4OsPc_MwFfnQJCDbg"
}
```


#### 5. **User Registration**  
- ![POST](https://img.shields.io/badge/POST-blue)  
- **API**: `/api/auth/register`  
- **Description**: Registers a new user in the system.  
- **Authentication**: None  
- **Access**: Public


#### 6. **Update User**  
- ![PUT](https://img.shields.io/badge/PUT-orange)  
- **API**: `/api/auth/updateUser/:name`  
- **Description**: Updates user information by their username.  
- **Authentication**: Required (JWT)  
- **Access**: Admin

### Example API : /api/auth/updateUser/Aditya Krishnan

### Body :
```
{
  "name": "Aditya New",
  "email": "aditya@gmail.com"
}

```
### Response :
```
{
    "message": "User updated successfully",
    "updatedUser": {
        "_id": "675737ebd2faef05dfb3be66",
        "name": "Aditya New",
        "email": "aditya@gmail.com",
        "password": "$2a$10$lwDGLj/DZqRfd3JW77DKVeb9HCPVqRAN6QeF4Bsq73pQ9w7rRIJ8m",
        "membership_type": "Regular",
        "registered_date": "2024-12-09T18:33:15.561Z",
        "__v": 0
    }
}
```


#### 7. **Delete User**  
- ![DELETE](https://img.shields.io/badge/DELETE-red)  
- **API**: `/api/auth/deleteUser/:name`  
- **Description**: Deletes a user by their username.  
- **Authentication**: Required (JWT)  
- **Access**: Admin

### Example API : /api/auth/deleteUser/Aditya New

### Body :
```
{
  "name": "Aditya New",
  "email": "aditya@gmail.com"
}


```
### Response :
```
{
    "message": "User Aditya New deleted successfully"
}
```

---

### Authentication

All endpoints that require authentication use **JWT (JSON Web Tokens)**. A valid token must be passed in the request header under `Authorization: Bearer <token>`.


### 6. Testing the Application
You can use Postman or any other API testing tool to test the endpoints.

### 7. Deployment
To deploy the application, you can host it on platforms like Heroku, Render, or Vercel. Make sure to configure the environment variables in the hosting service.

License
This project is licensed under the MIT License - see the LICENSE file for details.
