import React, { useState } from "react";
import BookShelf from "../components/BookShelf";

import Loader from "../containers/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { DragDropContext } from "react-beautiful-dnd";
export default function MainPage(props) {
  const [booksShelves] = useState([
    { id: "currentlyReading", title: "Currently reading" },
    { id: "wantToRead", title: "Want to read" },
    { id: "read", title: "Read" },
  ]);

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) {
      return;
    }
    const dragableBook = props.allBooks.filter(
      (book) => String(book.id) === String(draggableId)
    )[0];
    props.updateShelf(dragableBook, destination.droppableId);
  };
  return props.loading ? (
    <Loader />
  ) : (
    <div className="mainPage mt-5 pt-5">
      <DragDropContext onDragEnd={onDragEnd}>
        {booksShelves.map((shelf, index) => (
          <div className="currently mb-4" id={shelf.id} key={index}>
            <h4>{shelf.title}</h4>
            <BookShelf
              id={shelf.id}
              updateShelf={props.updateShelf}
              books={props.allBooks.filter((b) => b.shelf === shelf.id)}
            />
          </div>
        ))}
      </DragDropContext>

      <Link to="/search" className="searchIcon">
        <FontAwesomeIcon icon={faSearch} className="mx-2" />
      </Link>
    </div>
  );
}
