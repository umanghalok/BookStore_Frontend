import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {addBook} from '../../services/bookService.js';
import './BookForm.css';

const BookForm = () => {
  const [book, setBook] = useState({ title: '', author: '', publishYear: '', price: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!book.title.trim()) errors.title = 'Title is required.';
    if (!book.author.trim()) errors.author = 'Author is required.';
    if (!book.publishYear || book.publishYear < 0 || book.publishYear > new Date().getFullYear()) {
      errors.publishYear = `Publish Year should be between 0 and ${new Date().getFullYear()}.`;
    }
    if (!book.price || book.price <= 0) errors.price = 'Price should be a positive number.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await addBook(book);

    navigate('/');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Add Book</h1>
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={book.title} 
          onChange={handleChange} 
          required 
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <label>Author</label>
        <input 
          type="text" 
          name="author" 
          value={book.author} 
          onChange={handleChange} 
          required 
        />
        {errors.author && <span className="error">{errors.author}</span>}

        <label>Publish Year</label>
        <input 
          type="number" 
          name="publishYear" 
          value={book.publishYear} 
          onChange={handleChange} 
          required 
        />
        {errors.publishYear && <span className="error">{errors.publishYear}</span>}

        <label>Price</label>
        <input 
          type="number" 
          name="price" 
          value={book.price} 
          onChange={handleChange} 
          required 
        />
        {errors.price && <span className="error">{errors.price}</span>}

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
