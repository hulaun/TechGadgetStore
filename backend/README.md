# Booking System

This is a Node.js application for a booking system with both API and EJS endpoints.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Installation

1. Install dependencies:

    ```sh
    cd PE1
    npm install
    ```

2. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=3000
    JWT_SECRET=your_jwt_secret
    MONGODB_URI=mongodb://localhost:27017/bookingsystem
    ```

3. Start the MongoDB server:

    ```sh
    mongod
    ```

4. Start the application:

    ```sh
    npm start
    ```

## API Endpoints

### Authentication

- **Register**
  - **URL:** `/api/auth/register`
    - **Method:** `POST`
    - **Request Body:**

        ```json
        {
            "email": "customer1",
            "password": "customer"
        }
        ```

     **Response:**
        ```json
        {
            "message": "User created successfully",
            "user": {
                "email": "customer1",
                "password": "$2b$10$..."
            }
        }
        ```

- **Login**
  - **URL:** `/api/auth/login`
    - **Method:** `POST`
    - **Request Body:**

        ```json
        {
            "email": "customer1@example.com",
            "password": "customer"
        }
        ```

    - **Response:**

        ```json
        {
            "message": "Login successfully",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

### Booking

- **Create Booking**
  - **URL:** `/api/booking`
    - **Method:** `POST`
    - **Headers:**

        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```

    - **Request Body:**

        ```json
        {
            "checkInDate": "2022-12-14",
            "checkOutDate": "2022-12-17",
            "roomId": "room101"
        }
        ```

    - **Response:**

        ```json
        {
            "message": "Booking successful!",
            "booking": {
                "customerId": "60d5f9b8c2a1b2a5d8f8e8b8",
                "roomId": "room101",
                "checkInDate": "2022-12-14T00:00:00.000Z",
                "checkOutDate": "2022-12-17T23:59:59.999Z",
                "status": "pending"
            }
        }
        ```

- **Get All Bookings**
  - **URL:** `/api/booking`
    - **Method:** `GET`
    - **Headers:**

        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```

    - **Response:**

        ```json
        {
            "bookings": [
                {
                    "customerId": {
                        "email": "customer1"
                    },
                    "roomId": "room101",
                    "checkInDate": "2022-12-14T00:00:00.000Z",
                    "checkOutDate": "2022-12-17T23:59:59.999Z",
                    "status": "pending"
                }
            ]
        }
        ```

- **Delete Booking**
  - **URL:** `/api/booking/:id`
    - **Method:** `DELETE`
    - **Headers:**

        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```

     **Response:**
        ```json
        {
            "message": "Booking cancelled successfully"
        }
        ```

- **Get Bookings by Date**
  - **URL:** `/api/booking/byDate`
    - **Method:** `GET`
    - **Headers:**

        ```json
        {
            "Authorization": "Bearer <token>"
        }
        ```

    - **Request Body:**

        ```json
        {
            "startDate": "2021-12-01",
            "endDate": "2025-12-03"
        }
        ```

    - **Response:**

        ```json
        {
            "bookings": [
                {
                    "customerId": {
                        "email": "customer1"
                    },
                    "roomId": "room101",
                    "checkInDate": "2022-12-14T00:00:00.000Z",
                    "checkOutDate": "2022-12-17T23:59:59.999Z",
                    "status": "pending"
                }
            ]
        }
        ```

## EJS Endpoints

### Home Page

- **URL:** `/`
- **Method:** `GET`
- **Description:** Renders the home page.

### Login Page

- **URL:** `/login`
- **Method:** `GET`
- **Description:** Renders the login page.

### Register Page

- **URL:** `/register`
- **Method:** `GET`
- **Description:** Renders the registration page.
