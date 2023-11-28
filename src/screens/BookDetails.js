import React, { useEffect, useState } from "react";
import { get } from "../api/BooksAPI";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Loader from "../containers/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function BookDetails(props) {
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBookSDetails] = useState({});
  let bookId = useParams();
  useEffect(() => {
    setLoading(true);
    get(bookId.id).then((res) => {
      setBookSDetails(res);
      setLoading(false);
    });
  }, [bookId.id]);
  return (
    <div className="bookDetailsCard mt-5 pt-5">
      {" "}
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} className="mx-2 backIcon" />
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          {bookDetails !== undefined && (
            <Row>
            {console.log('dhhdhd')}
              <Col sm={4} style={{ margin: "auto", textAlign: "center" }}>
                <img
                  src={
                    bookDetails.imageLinks !== undefined
                      ? bookDetails.imageLinks.smallThumbnail
                      : null
                  }
                  alt="bookImage"
                />
              </Col>
              <Col sm={8}>
                <h3 className="pt-4">{bookDetails.title}</h3>
                <ul>
                  <strong>by:</strong>
                  {bookDetails.authors !== undefined &&
                    bookDetails.authors.map((author, index) => (
                      <li key={index}>{author}</li>
                    ))}
                </ul>
                <hr style={{ width: "70%" }} />
                <p>{bookDetails.description}</p>
                <p>
                  <strong>Published on:</strong> {bookDetails.publishedDate}
                </p>

                <p>{bookDetails.pageCount} Pages</p>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
}
