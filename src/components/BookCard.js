import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

export default function BookCard({ book, updateShelf, myIndex }) {
  return window.location.pathname === "/" ? (
    <Draggable index={myIndex} key={book.id} draggableId={String(book.id)}>
      {(provided) =>
        book.imageLinks !== undefined && (
          <Card
            style={{ width: "100%" }}
            className="bookCard"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card.Img
              variant="top"
              src={
                book.imageLinks !== undefined && book.imageLinks.smallThumbnail
              }
            />
            <Card.Body>
              <div className="shelfDropDown">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="mx-2 dropArrow"
                />
                <select
                  onChange={(e) => updateShelf(book, e.target.value)}
                  defaultValue={book.shelf ? book.shelf : "none"}
                >
                  <option value="none" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
              <Card.Title>{book.title}</Card.Title>

              <ul>
                <strong>by:</strong>
                {book.authors !== undefined &&
                  book.authors.map((author, index) => (
                    <li key={index}>{author}</li>
                  ))}
              </ul>
            </Card.Body>
            <Link className="moreDetailsBtn" to={`/book/${book.id}`}>
              more details
            </Link>
          </Card>
        )
      }
    </Draggable>
  ) : (
    <Card style={{ width: "100%" }} className="bookCard">
      <Card.Img
        variant="top"
        src={book.imageLinks !== undefined && book.imageLinks.smallThumbnail}
      />
      <Card.Body>
        <div className="shelfDropDown">
          <FontAwesomeIcon icon={faChevronDown} className="mx-2 dropArrow" />
          <select
            onChange={(e) => updateShelf(book, e.target.value)}
            defaultValue={book.shelf ? book.shelf : "none"}
          >
            <option value="" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
        <Card.Title>{book.title}</Card.Title>

        <ul>
          <strong>by:</strong>
          {book.authors !== undefined &&
            book.authors.map((author, index) => <li key={index}>{author}</li>)}
        </ul>
      </Card.Body>
      <Link className="moreDetailsBtn" to={`/book/${book.id}`}>
        more details
      </Link>
    </Card>
  );
}
