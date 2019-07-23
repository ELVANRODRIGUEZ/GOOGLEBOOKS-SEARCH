import axios from "axios";

export default {

  searchBooks(searchTerm) {
  return axios.get("https://www.googleapis.com/books/v1/volumes", { params: {
      q: searchTerm,
      maxResults: 40,
      intitle: searchTerm  
    }
  })
  },
  saveBook(bookData) {
    return axios.post("/api/books", bookData);
  },
  getSavedBooks() {
    return axios.get("/api/books");
  },
    
  deleteBook(bookId) {
    return axios.delete(`/api/books/${bookId}`);
  },
  
  
};
