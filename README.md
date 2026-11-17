# Faculty Library Management System

A Faculty Library Management System built with **React, Spring Boot, and MySQL** to help manage library materials and daily library operations.

## About the Project

This project is designed to support library management within a university faculty. It provides a simple interface for managing library materials, borrowers, departments, and borrowing activities.

## Features

- Dashboard for viewing library information
- Add, view, update, and delete library materials
- Search and filter library materials
- Pagination for library materials
- Manage departments
- Manage borrowers
- Manage material copies
- Record borrowing and returns
- Generate library reports

## Technologies Used

**Frontend**
- React
- JavaScript
- HTML
- CSS
- Vite

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Maven

**Database**
- MySQL

**Development Tools**
- Visual Studio Code
- IntelliJ IDEA
- XAMPP
- Postman

## Project Structure

```text
faculty-library-management-system/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles/
│
├── src/
│   └── main/
│       ├── java/
│       └── resources/
│
├── pom.xml
└── README.md
```

## Getting Started

### Prerequisites

- Java JDK
- Node.js and npm
- MySQL
- Maven

### Database Setup

1. Start MySQL using XAMPP or your preferred MySQL server.
2. Create a database named `library_db`.
3. Configure your database username and password using the environment variables `DB_USERNAME` and `DB_PASSWORD`.

### Running the Backend

1. Open the project in IntelliJ IDEA.
2. Configure the `DB_USERNAME` and `DB_PASSWORD` environment variables in the run configuration.
3. Run `LibraryappApplication.java`.

The backend runs on:

`http://localhost:8080`

### Running the Frontend

Open a terminal inside the `frontend` folder and run:

```bash
npm install
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## Project Status

The project is currently under development, with features being added and improved over time.

## Author

**Deborah Adekoya**

