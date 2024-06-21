import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {deleteBook, getBookById} from '../../services/bookService.js';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBookById(id);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try{
      await deleteBook(id);
      navigate('/');
    //console.log(result);
  }
  catch(err){
    console.log(err);
    navigate('/login');
  }
  };

  return (
    <div className="detail-container">
      {book && (
        <>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Publish Year: {book.publishYear}</p>
          <p>Price: Rs. {book.price}</p>
          <div className="action-links">
            <Link to={`/books/${book._id}/update`}>Update</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetail;
