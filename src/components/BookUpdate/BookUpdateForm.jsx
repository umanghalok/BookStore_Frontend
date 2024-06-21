import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBook,getBookById} from '../../services/bookService.js';
import './BookUpdateForm.css';

const BookUpdateForm = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ title: '', author: '', publishYear: '', price: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBookById(id);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!book.title) newErrors.title = 'Title is required';
    if (!book.author) newErrors.author = 'Author is required';
    if (!book.publishYear) {
      newErrors.publishYear = 'Publish year is required';
    } else if (isNaN(book.publishYear) || book.publishYear < 0 || book.publishYear > new Date().getFullYear()) {
      newErrors.publishYear = 'Publish year must be a valid year';
    }
    if (!book.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(book.price) || book.price < 0) {
      newErrors.price = 'Price must be a positive number';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      await updateBook(id, book);
      navigate(`/books/${id}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Update Book</h1>
        <label>Title</label>
        <input type="text" name="title" value={book.title} onChange={handleChange} />
        {errors.title && <p className="error">{errors.title}</p>}
        
        <label>Author</label>
        <input type="text" name="author" value={book.author} onChange={handleChange} />
        {errors.author && <p className="error">{errors.author}</p>}
        
        <label>Publish Year</label>
        <input type="number" name="publishYear" value={book.publishYear} onChange={handleChange} />
        {errors.publishYear && <p className="error">{errors.publishYear}</p>}
        
        <label>Price</label>
        <input type="number" name="price" value={book.price} onChange={handleChange} />
        {errors.price && <p className="error">{errors.price}</p>}
        
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default BookUpdateForm;
