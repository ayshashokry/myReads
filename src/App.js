//Import Styles
import "./App.css";
//Import API
import * as BooksAPI from "./api/BooksAPI";

//Import Packages
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Import Components
import MainPage from "./screens/MainPage";
import BookDetails from "./screens/BookDetails";
import SearchPage from "./screens/SearchPage";
function App() {
  const [loading, setLoading] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    BooksAPI.getAll().then((res) => {
      setAllBooks(res);
      setLoading(false);
    });
  }, []);
  const updateShelf = (book, shelf) => {
    setLoading(true);
    BooksAPI.update(book, shelf).then((res) =>
      BooksAPI.getAll().then((res) => {
        setAllBooks(res);
        setLoading(false);
      })
    );
  };
  //drag and drop cards

  return (
    <Router>
      <div className="App booksApp">
        <h2 className="mainTitle">My Reads</h2>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainPage
                allBooks={allBooks}
                loading={loading}
                updateShelf={updateShelf}
              />
            }
          />
          <Route exact path="/book/:id" element={<BookDetails />} />
          <Route
            exact
            path="/search"
            element={
              <SearchPage
                allBooks={allBooks}
                loading={loading}
                updateShelf={updateShelf}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
