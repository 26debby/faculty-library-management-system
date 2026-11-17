
import { useEffect, useState } from "react";
import "./styles/App.css";

import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments";
import Materials from "./pages/Materials";
import Borrowers from "./pages/Borrowers";
import MaterialCopies from "./pages/MaterialCopies";
import BorrowingReturns from "./pages/BorrowingReturns";
import Reports from "./pages/Reports";

// import BookForm from "./components/BookForm";
// import BookList from "./components/BookList";
// import SearchBar from "./components/SearchBar";

// import {
//   getBooks,
//   searchByName,
//   searchByCategory,
//   searchByGenre,
// } from "./services/BookService";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // const [books, setBooks] = useState([]);
  // const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (activePage === "Existing Books") {
      loadBooks();
    }
  }, [activePage]);

  async function loadBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(type, keyword) {
    if (keyword.trim() === "") {
      loadBooks();
      return;
    }

    try {
      let data = [];

      if (type === "name") {
        data = await searchByName(keyword);
      } else if (type === "category") {
        data = await searchByCategory(keyword);
      } else {
        data = await searchByGenre(keyword);
      }

      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  function renderPage() {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Departments":
        return <Departments />;

      case "Library Materials":
        return <Materials />;

      case "Material Copies":
        return <MaterialCopies />;

      case "Borrowers":
        return <Borrowers />;

      case "Borrowing & Returns":
        return <BorrowingReturns />;

      case "Reports":
        return <Reports />;

      // case "Existing Books":
      //   return (
      //     <div className="container">
      //       <h1>Existing Books</h1>

      //       <BookForm
      //         loadBooks={loadBooks}
      //         selectedBook={selectedBook}
      //         setSelectedBook={setSelectedBook}
      //       />

      //       <SearchBar
      //         onSearch={handleSearch}
      //         loadBooks={loadBooks}
      //       />

      //       <BookList
      //         books={books}
      //         loadBooks={loadBooks}
      //         setSelectedBook={setSelectedBook}
      //       />
      //     </div>
      //   );

      default:
        return <Dashboard />;
    }
  }

  const menuItems = [
    "Dashboard",
    "Departments",
    "Library Materials",
    "Material Copies",
    "Borrowers",
    "Borrowing & Returns",
    "Reports",
    //"Existing Books",
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>Faculty Library</h2>
        <p className="sidebar-subtitle">
          Natural and Applied Sciences
        </p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={activePage === item ? "active-menu" : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="app-main">
        <header className="top-header">
          <h2>{activePage}</h2>
          <span>Library Management System</span>
        </header>

        <section className="page-content">
          {renderPage()}
        </section>
      </main>
    </div>
  );
}

export default App;
