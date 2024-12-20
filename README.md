# Library Management API

## Overview
A simple and scalable library management API built with Express.js and Prisma. This project includes features such as user authentication, book management, category management, and favorite books functionality. Designed for learning purposes and to demonstrate API development with modern tools.

---

## Features
- **User Authentication**: Register and log in with JWT-based authentication.
- **Book Management**: Add, view, and manage books.
- **Category Management**: Create and view categories for books.
- **Favorite Books**: Users can add and manage their favorite books.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/library-management-api.git
   cd library-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Apply Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the server:
   ```bash
   npm start
   ```

---

## Endpoints

### Authentication
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in and receive a token.

### Books
- `GET /library`: Get all books.
- `POST /library/addBook`: Add a new book (Admin only).

### Categories
- `GET /library/category`: Get all categories.
- `POST /library/addCategory`: Add a new category (Admin only).

### Favorites
- `POST /favorites/add`: Add a book to favorites.
- `GET /favorites/:userId`: Get a user's favorite books.
- `DELETE /favorites/:favoriteId`: Remove a book from favorites.

---

## Technologies Used
- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **Prisma**: ORM for database management.
- **JWT**: Authentication.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
