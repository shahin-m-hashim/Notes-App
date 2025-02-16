# Notes App

## Objective

Build a simple and efficient Notes App with the following features:

- User authentication and authorization.
- Note creation, update, deletion, and organization.
- Efficient search and filtering functionality.
- Clean and maintainable code architecture.

---

## Tech Stack

- **Frontend:** React.js, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** SQLite

---

## Features and Flow

### 1. User Authentication

- **Signup and Login**

  - Allow users to register and log in securely.
  - Store hashed passwords securely.
  - Use JWT for authentication.

- **Post-Login Flow**
  - Redirect users to the dashboard upon successful login.

---

### 2. Dashboard

- **Overview**

  - Display a list of notes with the following details:
    - **Title**
    - **Content (Preview)**
    - **Created Date**
    - **Last Updated Date**
    - **Category** (e.g., Personal, Work, Study, Others)

- **Actions**
  - **Add New Notes**
  - **Edit Notes** (Title, Content, Category)
  - **Delete Notes**
  - **Search Notes** by title or content
  - **Filter Notes** by category

---

### 3. Note Management

- **Display and Interaction**

  - View all notes in a table or card format.
  - Click on a note to view detailed content.

- **Organization Features**
  - **Pin Important Notes**: Pinned notes appear at the top.
  - **Archive Notes**:
    - Move archived notes to a separate section instead of deleting.
    - Allow users to **Restore Archived Notes** back to active notes.

---

## Database Design (SQLite)

### 1. Users Table

| Column       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| `id`         | INTEGER  | Primary Key, Unique User ID |
| `name`       | TEXT     | User's Name                 |
| `email`      | TEXT     | Unique User's Email         |
| `password`   | TEXT     | Hashed Password             |
| `created_at` | DATETIME | Account Created Time        |

### 2. Notes Table

| Column       | Type     | Description                                 |
| ------------ | -------- | ------------------------------------------- |
| `id`         | INTEGER  | Primary Key, Unique Note ID                 |
| `title`      | TEXT     | Note Title                                  |
| `content`    | TEXT     | Note Content                                |
| `category`   | TEXT     | Personal, Work, Study, Others               |
| `color`      | TEXT     | #fec971, #fe9b72, #b693fd, #e4ef90, #00d4fe |
| `created_at` | DATETIME | Date Created                                |
| `updated_at` | DATETIME | Last Modified Date                          |
| `pinned`     | BOOLEAN  | If the note is pinned                       |
| `archived`   | BOOLEAN  | If the note is archived                     |
| `user_id`    | INTEGER  | Foreign Key, References Users Table         |

---

## API Endpoints

### 1. User Authentication

- **POST `/auth/signup`** – Register a new user.
- **POST `/auth/login`** – Authenticate user and return JWT token.

### 2. Note Management

- **GET `/notes`** – Fetch all notes for the authenticated user.
- **POST `/notes`** – Create a new note.
- **PUT `/notes/:id`** – Update an existing note.
- **DELETE `/notes/:id`** – Delete a note.
- **PATCH `/notes/:id/pin`** – Pin or unpin a note.
- **PATCH `/notes/:id/archive`** – Archive or unarchive a note.

---

## Conclusion

This Notes App project is designed to provide a seamless and efficient note-taking experience with robust user authentication, note management, and organizational features. By leveraging React.js on the frontend, Express.js on the backend, and SQLite as the database, the application ensures a lightweight yet powerful solution.

The clean architecture and modular design promote maintainability and scalability, while security measures like JWT authentication, input sanitization, and rate limiting guarantee a safe user experience. This project not only serves as a practical tool but also as an excellent learning opportunity for mastering full-stack development with modern web technologies.
