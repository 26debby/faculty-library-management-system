const API_URL = "https://faculty-library-management-system.onrender.com/api/books";

// Get all books
export async function getBooks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return await response.json();
}
// Add a book
export async function addBook(book) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Failed to add book");
  }

  return await response.json();
}
// Update a book
export async function updateBook(id, book) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  }); 

  if (!response.ok) {
    throw new Error("Failed to update book");
  }

  return await response.json();
}
// Delete a book
export async function deleteBook(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }

  return await response.text();
}
// Search by book name
export async function searchByName(name) {
  const response = await fetch(`${API_URL}/name/${name}`);

  if (!response.ok) {
    throw new Error("Failed to search by name");
  }

  return await response.json();
}

// Search by category
export async function searchByCategory(category) {
  const response = await fetch(`${API_URL}/category/${category}`);

  if (!response.ok) {
    throw new Error("Failed to search by category");
  }

  return await response.json();
}

// Search by genre
export async function searchByGenre(genre) {
  const response = await fetch(`${API_URL}/genre/${genre}`);

  if (!response.ok) {
    throw new Error("Failed to search by genre");
  }

  return await response.json();
}
