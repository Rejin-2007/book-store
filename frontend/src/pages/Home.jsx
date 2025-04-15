import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from "react-icons/md";
import BookCard from '../components/home/BookCard';
const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/books`)
      .then((res) => {
        console.log('Fetched data:', res.data); // 👈 Add this
        setBooks(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error('Response Error:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Request Error:', error.request);
        } else {
          console.error('Unexpected Error:', error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='P-4 items-center'>

      <h1 className='text-3xl text-center text-white '>My Book List</h1>
      <Link to={`/books/create`}>
        <div className="flex justify-center space-x-2 mt-4">
          <MdOutlineAddBox className="text-2xl  text-white" />
          <span className=" text-white text-base">Add Item</span>
        </div>
      </Link>
      {loading ? <Spinner /> : <BookCard books={books} />}
    </div>
  )
}

export default Home
