import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BookCard from '../components/home/BookCard';

const Home = () => {
  const apiUrl = "https://book-store-backend-2ymx.onrender.com"
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);
    axios
      .get(`${apiUrl}/books`)
      .then((res) => {
        setBooks(res.data.data); // Access the correct data path
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 items-center">
      <h1 className="text-3xl text-center text-white">My Book List</h1>
      <Link to={`/books/create`}>
        <div className="flex justify-center space-x-2 mt-4">
          <MdOutlineAddBox className="text-2xl text-white" />
          <span className="text-white text-base">Add Item</span>
        </div>
      </Link>
      {loading ? <Spinner /> : <BookCard books={books} />}
    </div>
  );
};

export default Home;